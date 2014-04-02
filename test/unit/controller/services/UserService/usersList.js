/*
* Name : usersList.js
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
			},
			config: {
				usersPerPage: 1
			}
		},
		query: {
			page: 1
		}
	};

	var res = {
		json: null
	};

	var model = {
		findAllPaginated: null,
		countAll: null
	};

	req.app.db.user.model = function () {
		return model;
	};

	res.json = function (obj) {
		assert.deepEqual(obj, {
			perpage: 1,
			numusers: 1,
			users: 1
		});
	};

	describe("usersList() TU-52", function () {

		it("Ritorna la lista degli utente", function (done) {

			model.findAllPaginated = function (usersPerPage, query, cb, eb) {
				cb(1);
			};

			model.countAll = function (cb, eb) {
				cb(1);
			};

			UserService.usersList(req, res, function () {
				done(new Error());
			});

			done();
		});

		it("Gestisce il fallimento della ricerca degli utenti", function (done) {

			model.findAllPaginated = function (usersPerPage, query, cb, eb) {
				eb(new MaapError(1000));
			};

			UserService.usersList(req, res, function (obj) {
				assert.deepEqual(obj, new MaapError(1000));
				done();
			});
		});

		it("Gestisce il fallimento del conteggio degli utenti", function (done) {

			model.findAllPaginated = function (usersPerPage, query, cb, eb) {
				cb(1);
			};

			model.countAll = function (cb, eb) {
				eb(new MaapError(1000));
			};

			UserService.usersList(req, res, function (obj) {
				assert.deepEqual(obj, new MaapError(1000));
				done();
			});
		});
	});
});