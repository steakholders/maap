/*
* Name : ForgotService.js
* Module : Back-end::Lib::Controller::Service::ForgotService
* Location : /lib/controller/controller
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1           2014-03-01     Luca De Franceschi
* -------------------------------------------------
* Codifica modulo
* =================================================
*/

'use strict';

var forgotMailView = require("../../view/forgotMailView");

exports.passwordResetRequest = function(req, res, next) {
	var User = req.app.db.user.model('users');
	var sender = req.app.config.smtp.auth.user;
	var receiver = req.body.email;
	
	var sendMail = function(token) {
		var tokenlink = req.app.config.resetPassword.link + "?token=" + token;
		
		// Genera il messaggio "message", interagendo con il template View::ForgotMailView
		var forgotmail = forgotMailView.buildForgotMail(receiver, sender , tokenlink);

		req.app.sendMail(
			forgotmail,
			function(response) {
				res.end();
			},
			function(error) {
				next(error);
			}
		);
	};

	User.safeFindByEmail(receiver,
		function success(result) {
			result.generateResetPasswordToken(
				function success(result) {
					sendMail(result.resetPasswordToken.token);
				},
				function error(err){
					next(err);
				}
			);
		},
		function error(err){
			next(err);
		}
	);
};

exports.passwordReset = function(req,res,next) {
	var token = req.body.token;
	var newPassword = req.body.password;
	var User = req.app.db.user.model('users');

	User.safeFindByResetPasswordToken(token,
		function success(result) {
			result.consumeResetPasswordTokenAndUpdatePassword(
				newPassword,
				function success(result) {
					res.end();
				},
				function error(err) {
					next(err);
				}
			);
		},
		function error(err) {
			next(err);
		}
	);
};
