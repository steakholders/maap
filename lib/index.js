/*
* Name : index.js
* Module : Back-end::Lib
* Location : /lib/
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1          2014-03-01     Gianluca Donato
* -------------------------------------------------
* Codifica modulo.
* =================================================
*/
'use strict';

var express = require('express');
var mongoose = require('mongoose');
var usermodel = require('./model/UserModel');
var middleware = require("./controller/middleware");
var MongoStore = require('connect-mongo')(express);
var createSuperAdmins = require("./utils/CreateSuperAdmins");

var initDB = function(app) {
	var config = app.config;
	app.db = {};
	
	// Connette a DB utenti
	app.db.user = mongoose.createConnection("mongodb://" + config.userDB.url);
	app.db.user.on("error", function(err) {
		console.error(err);
		console.error("Check if your mongodb Users database is running at " + config.userDB.url);
	});
	app.db.user.on('open', function (ref) {
		console.log('Users database connected.');
	});
	usermodel.init(app);
	
	// Connette a DB dati
	app.db.data = mongoose.createConnection("mongodb://" + config.dataDB.url);
	app.db.data.on("error", function(err) {
		console.error(err);
		console.error("Check if your mongodb Data database is running at " + config.dataDB.url);
	});
	app.db.data.on('open', function (ref) {
		console.log('Data database connected.');
	});	
};

var initApp = function(app)  {
	var config = app.config;
	
	if (config.env === "development") {
		app.use(express.logger());
	}
	
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(express.cookieParser("y0ur $3cret h3re"));
	app.use(express.session({
		secret: "y0ur $3cret h3re",
		store: new MongoStore({
			url: "mongodb://" + config.userDB.url,
			maxAge: 2 * 7 * 24 * 3600 * 1000
		})
	}));
		
	if (config.webServer && config.webServer.static) {
		app.use(express.static(config.webServer.static));
	}
	
	middleware.init(app);
};

var initSuperAdmins = function(app) {
	createSuperAdmins(
		app.config.superAdmins,
		app.db.user.model("users")
	);
};

var start = function(config)  {
	var app = express();
	app.config = config;
	initDB(app);
	initSuperAdmins(app);
	initApp(app);
	
	process.on('uncaughtException', function(err) {
		console.error("/!\\ Caught exception:", err);
	});

	console.log("Starting app.listen...");
	app.listen(config.webServer.port);
};

exports.initDB = initDB;
exports.initApp = initApp;
exports.start = start;
