/*
* Name : ErrorHandler.js
* Module : Back-end::Lib::Controller::Middleware::ErrorHandler
* Location : /lib/controller/middleware
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1          2014-02-28      Giacomo Fornari
* -------------------------------------------------
* Codifica modulo
* =================================================
*/
'use strict';

var MaapError = require("../../utils/MaapError");
//var assert = require("assert");

exports.handler = function(err, req, res, next)  {
	if(err instanceof MaapError) {
		res.json(500, err.toDict());
	}
	else{
		console.error("ErrorHandler received an error that is not a MaapError", err);
		res.json(500, new MaapError(err));
	}
};