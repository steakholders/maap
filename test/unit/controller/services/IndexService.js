/*
* Name : IndexService.js
* Module : UnitTest
* Location : /unit/controller/service
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1           2014-03-03    Giacomo Fornari
* -------------------------------------------------
* Codifica test
* =================================================
*/

"use strict";

var IndexService = require("../../../../lib/controller/service/IndexService");
var MaapError = require("../../../../lib/utils/MaapError");
var assert = require('assert');

describe("IndexService", function () {

	var req = {
		app: {
			dslDomain: {
				getCollectionModel: null
			},
			queryLimit: 1
		},
		query: {
			page: 1,
			sort: 1,
			order: 1,
		},
		params: {
			collectionId: "collectionId"
		}
	};

	var res = {
		json: null
	};

	var collection = {
		getIndexModel: null
	};

	var indexModel = {
		getData: null
	};
	
	describe("getIndexPage() TU-54", function () {

		it("Risponde con la rappresentazione della index-page in formato json", function (done) {

			res.json = function (obj) {
				assert.strictEqual(obj, 1);
			};

			indexModel.getData = function (page, sort, order, cb, eb) {
				cb(1);
			};

			collection.getIndexModel = function () {
				return indexModel;
			};

			req.app.dslDomain.getCollectionModel = function (collectionId) {
				return collection;
			};

			IndexService.getIndexPage(req, res, function () {
				done(new Error());
			});

			done();
		});

		it("Gestisce gli errori se la collection non è stata trovata", function (done) {

			req.app.dslDomain.getCollectionModel = function (collectionId) {
				return null;
			};

			IndexService.getIndexPage(req, res, function (obj) {
				assert.deepEqual(obj, new MaapError(7000));
				done();
			});
		});
	});
});
