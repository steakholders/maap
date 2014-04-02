/*
* Name : DslCollectionModel.js
* Module : UnitTest
* Location : /test/unit/model/dslmodel
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1           2014-03-02     Luca De Franceschi     
* -------------------------------------------------
* Codifica test
* =================================================
*/

"use strict";

var DslCollectionModel = require("../../../../lib/model/dslmodel/DslCollectionModel.js");
var MaapError = require("../../../../lib/utils/MaapError.js");
var assert = require('assert');

describe("DslCollectionModel", function() {

	var dslCollectionModel = null;

	describe("DslCollectionModel TU-28", function() {

		var dslDomain = {
			db: {
				model: function () {}
			}
		};

		it("Viene creato con valori compatibili", function(done) {
			
			dslCollectionModel = new DslCollectionModel(dslDomain, {
				name: "name",
				id: "1",
				label: "label",
				weight: 1
			});

			done();
		});

		it("Viene sollevata un'eccezione con valori non compatibili", function(done) {
			
			assert.throws(
				function () {
					new DslCollectionModel(dslDomain, {
						name: "name",
						err: "1",
						label: "label",
						weight: 1
					});
				},
				MaapError
			);

			done();
		});
	});

	describe("getName() TU-29", function () {

		it("Restituisce il campo label", function(done) {
			
			assert.strictEqual(dslCollectionModel.getName(), "name");

			done();
		});
	});

	describe("getIndexModel() TU-30", function () {

		it("Restituisce il campo indexModel", function(done) {
			
			assert.notStrictEqual(dslCollectionModel.getIndexModel(), null);

			done();
		});
	});

	describe("getShowModel() TU-31", function () {

		it("Restituisce il campo showModel", function(done) {
			
			assert.notStrictEqual(dslCollectionModel.getShowModel(), null);

			done();
		});
	});

	describe("setIndexModel() TU-32", function () {

		it("Imposta il campo indexModel", function(done) {
			
			dslCollectionModel.setIndexModel(true);
			assert.strictEqual(dslCollectionModel.getIndexModel(), true);

			done();
		});
	});

	describe("setShowModel() TU-33", function () {

		it("Imposta il campo showModel", function(done) {

			dslCollectionModel.setShowModel(true);
			assert.strictEqual(dslCollectionModel.getShowModel(), true);

			done();
		});
	});

	describe("getId() TU-142", function () {

		it("Restituisce il campo id", function(done) {

			assert.strictEqual(dslCollectionModel.getId(), "1");

			done();
		});
	});

	describe("getLabel() TU-143", function () {

		it("Restituisce il campo label", function(done) {

			assert.strictEqual(dslCollectionModel.getLabel(), "label");

			done();
		});
	});

	describe("getWeight() TU-144", function () {

		it("Restituisce il campo weight", function(done) {

			assert.strictEqual(dslCollectionModel.getWeight(), 1);

			done();
		});
	});

	describe("toString() TU-145", function () {

		it("Restituisce il campo name", function(done) {

			assert.strictEqual(dslCollectionModel.toString(), "name");

			done();
		});
	});
});