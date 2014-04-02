/*
* Name : ProfileService.js
* Module : Back-end::Lib::Controller::Service::ProfileService
* Location : /lib/controller/controller
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1           2014-02-28     Serena Girardi
* -------------------------------------------------
* Codifica modulo
* =================================================
*/

'use strict';

var MaapError = require("../../utils/MaapError");

exports.login = function(req, res, next) {
	res.json(req.user);
};

exports.logout = function(req, res, next) {
	req.session.destroy();
	req.logOut();
	res.end();
};

exports.getProfile = function(req, res, next) {
	res.json(req.user);
};

/* Aggiorna l'utente indicato con i parametri inseriti */
exports.updatePassword = function(req, res, next) {
	// Passport ha già caricato il profilo
	var user = req.user;
	var oldpassword = req.body.oldpassword || "";
	var password = req.body.password || "";
	
	user.authenticate(oldpassword, function(err, passwordMatch) {
		if (err) {
			next(new MaapError(err));
		} else {
			if (!passwordMatch) {
				// La vecchia password è sbagliata
				next(new MaapError(10000));
			} else {
				user.setPassword(password, function(err, data) {
					if (err) {
						next(new MaapError(err));
					}
					else {
						user.save(function(err, data) {
							if (err) {
								next(new MaapError(err));
							}
							res.end();
						});
					}
				});
			}
		}
	});
};
