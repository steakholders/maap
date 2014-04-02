/*
* Name : deleteUser.js
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
		},
		user: {
			email: "email"
		}
	};

	var res = {
		json: null
	};

	var model = {
		safeFindById: null,
		safeFindByIdAndRemove: null
	};

	req.app.db.user.model = function () {
		return model;
	};

	res.json = function (obj) {
		assert.strictEqual(obj, 1);
	};

	describe("deleteUser() TU-48", function () {

		it("Elimina l'utente", function (done) {

			model.safeFindById = function (id, cb, eb) {
				var obj = {
					email: "m",
					level: "1"
				};

				cb(obj);
			};

			model.safeFindByIdAndRemove = function (id, cb, eb) {
				cb(1);
			};

			UserService.deleteUser(req, res, function () {
				done(new Error());
			});

			done();
		});

		it("Gestisce il caso in cui l'utente da eliminare è quello corrente", function (done) {

			model.safeFindById = function (id, cb, eb) {
				var obj = {
					email: "email",
					level: "1"
				};

				cb(obj);
			};

			model.safeFindByIdAndRemove = function (id, cb, eb) {
				cb(1);
			};

			UserService.deleteUser(req, res, function (obj) {
				assert.deepEqual(obj, new MaapError(9001));
			});

			done();
		});

		it("Gestisce il caso in cui l'utente da eliminare è un superadmin", function (done) {

			model.safeFindById = function (id, cb, eb) {
				var obj = {
					email: "m",
					level: "3"
				};

				cb(obj);
			};

			model.safeFindByIdAndRemove = function (id, cb, eb) {
				cb(1);
			};

			UserService.deleteUser(req, res, function (obj) {
				assert.deepEqual(obj, new MaapError(9001));
			});

			done();
		});

		it("Gestisce il caso in cui la ricerca dell'utente fallisce", function (done) {

			model.safeFindById = function (id, cb, eb) {
				eb(new MaapError(1000));
			};

			UserService.deleteUser(req, res, function (obj) {
				assert.deepEqual(obj, new MaapError(1000));
			});

			done();
		});

		it("Gestisce il caso in cui la rimozione dell'utente fallisce", function (done) {

			model.safeFindById = function (id, cb, eb) {
				var obj = {
					email: "m",
					level: "1"
				};

				cb(obj);
			};

			model.safeFindByIdAndRemove = function (id, cb, eb) {
				eb(new MaapError(1000));
			};

			UserService.deleteUser(req, res, function (obj) {
				assert.deepEqual(obj, new MaapError(1000));
			});

			done();
		});
	});
});