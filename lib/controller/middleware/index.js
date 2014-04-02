/*
* Name : index.js
* Module : Back-end::Lib::Controller::Middleware::MiddlewareLoader
* Location : /lib/controller/middleware
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1          2014-03-01      Gianluca Donato
* -------------------------------------------------
* Codifica modulo.
* =================================================
*/
'use strict';

var DslLoaderHandler = require("./DslLoaderHandler");

exports.init = function(app) {
	
	require("./AppInjector").init(app);

	var dslLoader = new DslLoaderHandler();
	dslLoader.init(app);
	
	require("./../../utils/Mailer").init(app);
	require("./Authentication").init(app);
	require("./Router").init(app);
	
	app.use(require("./NotFoundHandler").handler);
	app.use(require("./ErrorHandler").handler);
};