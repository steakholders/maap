/*
* Name : Authentication.js
* Module : Back-end::Lib::Controller::Middleware::Authentication
* Location : /lib/controller/middleware
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1           2014-02-27     Serena Girardi
* -------------------------------------------------
* Codifica Modulo.
* =================================================
*/

'use strict';

var passport = require('passport');
var MaapError = require('../../utils/MaapError');

exports.init = function(app) {
	var User = app.db.user.model('users');
	passport.use(User.createStrategy());

	passport.serializeUser(User.serializeUser());
	passport.deserializeUser(User.deserializeUser());

	app.use(passport.initialize());
	app.use(passport.session());
};

exports.authenticate = function(req,res,next){
	passport.authenticate('local',
		function(err, user, info) {
			if (err) {
				return next(err);
			}
			if (!user) {
				return res.json(401, new MaapError(1000).toDict());
			}
			req.logIn(user, function(err) {
				if (err) {
					return next(err);
				}
				return next();
			});
		}
	)(req,res,next);
};

exports.requireNotLogged = function(req, res, next) {
	if (!req.user) {
		next();
	}
	else { 
		res.json(401, new MaapError(1002).toDict());
	}
};

exports.requireLogged = function(req, res, next) {
	if (req.isAuthenticated()) {
		if ( req.user.level === "1" || req.user.level === "2" || req.user.level === "3") {
			return next();
		}
		else { 
			res.json(401, new MaapError(1003).toDict()); 
		}
	}
	else { 
		res.json(401, new MaapError(1001).toDict()); 
	}
};

exports.requireAdmin = function(req, res, next) {
	if (req.isAuthenticated()) {
		if ( req.user.level === "2" || req.user.level === "3") {
			return next();
		}
		else {
			res.json(401, new MaapError(1004).toDict()); 
		}
	}
	else { 
		res.json(401, new MaapError(1001).toDict());
	}
};

exports.requireSuperAdmin = function(req, res, next) {
	if (req.isAuthenticated()) {
		if ( req.user.level === "3") {
			return next();
		}
		else { 
			res.json(401, new MaapError(1005).toDict()); 
		}
	}
	else { 
		res.json(401, new MaapError(1001).toDict());
	}
};
