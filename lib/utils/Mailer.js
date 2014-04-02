/*
* Name : Mailer.js
* Module : Back-end::Lib::Utils::Mailer
* Location : /lib/utils
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1          2014-03-02     Enrico Rotundo
* -------------------------------------------------
* Codifica modulo.
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
