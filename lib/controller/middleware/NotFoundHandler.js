/*
* Name : NotFoundHandler.js
* Module : Back-end::Lib::Controller::Middleware::NotFoundHandler
* Location : /lib/controller/middleware
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1          2014-02-28      Enrico Rotundo
* -------------------------------------------------
* Codifica modulo.
* =================================================
*/

'use strict';

var MaapError = require("../../utils/MaapError");

exports.handler = function(req,res,next) {
	res.json(404, new MaapError(6000).toDict());
};