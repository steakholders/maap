/*
* Name : Row.js
* Module : UnitTest
* Location : /test/unit/model/dslmodel
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.0.1          2014-03-02     Federico Poli
* -------------------------------------------------
* Codifica test
* =================================================
*/
"use strict";

var Row = require("../../../../lib/model/dslmodel/Row.js");
var MaapError = require("../../../../lib/utils/MaapError.js");
var assert = require('assert');

describe("Row", function() {

	var showModel = {
			collectionModel: {
				toString: function () {}
			}
		};

	describe("Row TU-154", function () {

		var attr = null;

		it("Viene creato con valori compatibili", function(done) {
			
			attr = new Row(showModel, {
				name: "prova",
				label: "prova",
				transformation: function(){}
			});

			done();
		});

		it("Viene sollevata un'eccezione con valori non compatibili", function(done) {
			
			assert.throws(
				function () {
					new Row(showModel, {
						name: "prova",
						err: "prova",
						transformation: function(){}
					});
				},
				MaapError
			);

			done();
		});
	});

	describe("getLabel() TU-150", function () {

		var row = new Row(showModel, {
				name: "name",
				label: "label",
				transformation: function(){}
			}); 

		it("Restituisce il campo label", function(done) {
			
			assert.strictEqual(row.getLabel(), "label");

			done();
		});
	});

	describe("getName() TU-151", function () {

		var row = new Row(showModel, {
				name: "name",
				label: "label",
				transformation: function(){}
			}); 

		it("Restituisce il campo name", function(done) {
			
			assert.strictEqual(row.getName(), "name");

			done();
		});
	});

	describe("getTransformation() TU-152", function () {

		var row = new Row(showModel, {
				name: "name",
				label: "label",
				transformation: function(){}
			}); 

		it("Restituisce il campo transformation", function(done) {
			
			assert.strictEqual(typeof row.getTransformation(), 'function');

			done();
		});
	});
});
