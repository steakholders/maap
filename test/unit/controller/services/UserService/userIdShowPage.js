/*
* Name : userIdShowPage.js
* Module : UnitTest
* Location : /unit/controller/service/userService
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1           2014-03-05     Enrico Rotundo
* -------------------------------------------------
* Codifica modulo.
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
		params: {
			id: 1
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

	describe("userIdShowPage() TU-51", function () {

		it("Ritorna i dati dell'utente", function (done) {

			model.safeFindById = function (obj, cb, eb) {
				cb(1);
			};

			UserService.userIdShowPage(req, res, function () {
				done(new Error());
			});

			done();
		});

		it("Gestisce il fallimento della ricerca dell'utente", function (done) {

			model.safeFindById = function (id, cb, eb) {
				eb(new MaapError(1000));
			};

			UserService.userIdShowPage(req, res, function (obj) {
				assert.deepEqual(obj, new MaapError(1000));
				done();
			});
		});
	});
});