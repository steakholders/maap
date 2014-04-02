/*
* Name : DslLoaderHandler.js
* Module : Back-end::Lib::Model::DSLModel
* Location : /lib/controller/middleware
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1          2014-03-04     Federico Poli
* -------------------------------------------------
* Codifica Modulo.
* =================================================
* 0.0.2          2014-03-27     Luca De Franceschi
* -------------------------------------------------
* Modifiche metodo loadDsl.
* =================================================
*/
'use strict';

var DslDomain = require("../../model/dslmodel/DslDomain");
var MaapError = require("../../utils/MaapError");
var fs = require('fs');
var async = require('async');

var DslLoaderHandler = function(app) {
	this.error = undefined;
	this.dslDomain = undefined;
};

/*
	Sarebbe corretto avere una callback e errback, ma allora bisognerebbe anche ritardare
	la partenza di express e sarebbe più complicato. TODO
*/
DslLoaderHandler.prototype.init = function(app)  {
	var self = this;
	
	this.dslDomain = new DslDomain(app.db.data);
	app.dslDomain = this.dslDomain;
	app.use(this);

	this.dslDomain.init(
		function success() {
			self.loadDsl(app.config.collectionPath + "/");
		},
		function error(maaperror) {
			this.error = maaperror;
		}
	);	
};

DslLoaderHandler.prototype.loadDsl = function(collectionPath) {
	var self = this;
	
	fs.readdir(collectionPath, function(err, dslFiles) {
		if (err) {
			console.error("Error opening the DSL folder", err);
			self.error = new MaapError(err);
		}
		else {
			async.map(dslFiles,
				function worker(file, callback) {
					self.dslDomain.loadDSLFile(collectionPath + file, callback);
				},
				function then(err, results) {
					console.log("DSL files loaded ("+results.length+").");
				}
			);
		}
	});
};

DslLoaderHandler.prototype.handle = function(req, res, next) {
	if (this.error !== undefined) {
		next(this.error);
	} else {
		var dslErrors = this.dslDomain.getErrors();
		if (dslErrors.length > 0) {
			var error = new MaapError(
				17000,
				dslErrors.map(function(error){ return error.toDict(); })
			);
			next(error);
		} else {
			next();
		}
	}
};

module.exports = DslLoaderHandler;