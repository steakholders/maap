/*
* Name : registertUser.js
* Module : UnitTest
* Location : /unit/controller/service/userService
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1           2014-03-04     Giacomo Fornari
* -------------------------------------------------
* Codifica modulo.
* =================================================
* 0.0.2          2014-03-26		 Enrico Rotundo
* -------------------------------------------------
* Incremento.
* =================================================
*/
"use strict";

var UserService = require("../../../../../lib/controller/service/UserService");
var MaapError = require("../../../../../lib/utils/MaapError");
var assert = require('assert');

describe("UserService", function () {

	var req = {
		app: {
			db: {
				user: {
					model: null
				}
			}
		},
		body: {
			email: "email",
			password: "password"
		}
	};

	var res = {
		json: null
	};

	var model = {
		createUser: null
	};

	req.app.db.user.model = function () {
		return model;
	};

	res.json = function (obj) {
		assert.strictEqual(obj, 1);
	};

	describe("registerUser() TU-49", function () {

		it("Registra l'utente", function (done) {

			model.createUser = function (id, cb, eb) {
				cb(1);
			};

			UserService.registerUser(req, res, function () {
				done(new Error());
			});

			done();
		});

		it("Gestisce il fallimento della registrazione dell'utente", function (done) {

			model.createUser = function (id, cb, eb) {
				eb(new MaapError(1000));
			};

			UserService.registerUser(req, res, function (obj) {
				assert.deepEqual(obj, new MaapError(1000));
				done();
			});
		});
	});
});