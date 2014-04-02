/*
* Name : updateLevel.js
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
					model: null,
				}
			}
		},
		params: {
			id: 1
		},
		body: {
			level: "level"
		},
		user: {
			email: "mail"
		}
	};

	var res = {
		json: null
	};

	var model = {
		safeFindById: null
	};

	req.app.db.user.model = function () {
		return model;
	};

	res.json = function (obj) {
		assert.strictEqual(obj, 1);
	};

	describe("updateLevel() TU-53", function () {

		it("Ritorna i dati dell'utente", function (done) {

			model.safeFindById = function (id, cb, eb) {
				var obj = {
					level: 1,
					updateLevel: null
				};

				obj.updateLevel = function (level, cb, eb) {
					cb(1);
				};

				cb(obj);
			};

			UserService.updateLevel(req, res, function () {
				done(new Error());
			});

			done();
		});

		it("Gestisce il caso in cui si voglia aggiornare il livello a superadmin", function (done) {

			req.body.level = "3";

			UserService.updateLevel(req, res, function (obj) {
				assert.deepEqual(obj, new MaapError(9003));
			});

			done();
		});

		it("Gestisce il caso in cui si voglia aggiornare il livello di un superadmin", function (done) {

			req.body.level = "1";

			model.safeFindById = function (id, cb, eb) {
				var obj = {
					level: 3,
					updateLevel: null
				};

				obj.updateLevel = function (level, cb, eb) {
					cb(1);
				};

				cb(obj);
			};

			UserService.updateLevel(req, res, function (obj) {
				assert.deepEqual(obj, new MaapError(9003));
			});

			done();
		});

		it("Gestisce il caso in cui la ricerca dell'utente fallisce", function (done) {

			req.body.level = "1";

			model.safeFindById = function (id, cb, eb) {
				eb(new MaapError(1000));
			};

			UserService.updateLevel(req, res, function (obj) {
				assert.deepEqual(obj, new MaapError(1000));
			});

			done();
		});
	});
});