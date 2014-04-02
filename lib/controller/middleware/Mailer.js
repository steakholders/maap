/*
* Name : Mailer.js
* Module : Back-end::Lib::Utils::Mailer
* Location : /lib/controller/middleware
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1           2014-02-28     Luca De Franceschi
* -------------------------------------------------
* Codifica Modulo.
* =================================================
*/

'use strict';

var nodemailer = require("nodemailer");

exports.init = function(app) {
	var transport = nodemailer.createTransport("SMTP", app.config.smtp);
	
	app.sendMail = function(message, callback, errback) {
		transport.sendMail(message, function(error, response) {
			if (error) { 
				errback(error);
			} else {
				callback(response);
			}
		});
	};
};
