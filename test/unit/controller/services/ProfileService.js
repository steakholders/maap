/*
* Name : ProfileService.js
* Module : UnitTest
* Location : /unit/controller/services/
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1           2014-02-28     Giacomo Fornari
* -------------------------------------------------
* Codifica test
* =================================================
*/
"use strict";

var ProfileService = require("../../../../lib/controller/service/ProfileService");
var MaapError = require("../../../../lib/utils/MaapError");
var assert = require('assert');

describe("ProfileService", function () {
	
	describe("login() TU-72", function () {

		var req = {
			user: 1
		};

		var res = {
			json: null
		};

		res.json = function (obj) {
			assert.strictEqual(obj, 1);
		};

		it("Reindirizza l'utente alla dashboard", function (done) {

			ProfileService.login(req, res, function () {
				done(new Error());
			});

			done();
		});
	});

	describe("logout() TU-73", function () {

		var req = {
			logOut: null,
			session: {
				destroy: null
			}
		};

		var res = {
			end: null
		};

		req.logOut = function () {};
		req.session.destroy = function () {};

		res.end = function () {};

		it("Distrugge la sessione e reindirizza l'utente alla pagina di login", function (done) {

			ProfileService.logout(req, res, function () {
				done(new Error());
			});

			done();
		});
	});

	describe("getProfile() TU-74", function () {

		var req = {
			user: 1
		};

		var res = {
			json: null
		};

		res.json = function (obj) {
			assert.strictEqual(obj, 1);
		};

		it("Risponde con le informazioni del profilo dell'utente", function (done) {

			ProfileService.getProfile(req, res, function () {
				done(new Error());
			});

			done();
		});
	});

	describe("updatePassword() TU-75", function () {

		var req = {
			body: {
				oldpassword: "oldpassword",
				password: "password"
			},
			user: {
				authenticate: null,
				setPassword: null,
				save: null
			}
		};

		var res = {
			end: null
		};

		it("Aggiorna la password dell'utente", function (done){

			req.user.authenticate = function (oldpassword, cb) {
				cb(null, true);
			};

			req.user.setPassword = function (password, cb) {
				cb(null, true);
			};

			req.user.save = function (cb) {
				cb(null, true);
			};

			res.end = function () {};

			ProfileService.updatePassword(req, res, function () {
				done(new Error());
			});

			done();
		});

		it("Gestisce gli errori se l'autenticazione fallisce", function (done) {

			req.user.authenticate = function (oldpassword, cb) {
				cb(1000, null);
			};

			ProfileService.updatePassword(req, res, function (obj) {
				assert.deepEqual(obj, new MaapError(1000));
				done();
			});
		});

		it("Gestisce gli errori se la password di autenticazione non corrisponde", function (done) {

			req.user.authenticate = function (oldpassword, cb) {
				cb(null);
			};

			ProfileService.updatePassword(req, res, function (obj) {
				assert.deepEqual(obj, new MaapError(10000));
				done();
			});
		});

		it("Gestisce gli errori se l'aggiornamento della password fallisce", function (done) {

			req.user.authenticate = function (oldpassword, cb) {
				cb(null, true);
			};

			req.user.setPassword = function (password, cb) {
				cb(1000, null);
			};

			ProfileService.updatePassword(req, res, function (obj) {
				assert.deepEqual(obj, new MaapError(1000));
				done();
			});
		});

		it("Gestisce gli errori se il salvataggio fallisce", function (done) {

			req.user.authenticate = function (oldpassword, cb) {
				cb(null, true);
			};

			req.user.setPassword = function (password, cb) {
				cb(null, true);
			};

			req.user.save = function (cb) {
				cb(1000, null);
			};

			ProfileService.updatePassword(req, res, function (obj) {
				assert.deepEqual(obj, new MaapError(1000));
				done();
			});
		});
	});
});