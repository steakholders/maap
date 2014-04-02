/*
* Name : Column.js
* Module : UnitTest
* Location : /unit/model/dslmodel
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1         2014-03-02      Giacomo Fornari
* -------------------------------------------------
* Codifica test
* =================================================
*/
"use strict";

var Column = require("../../../../lib/model/dslmodel/Column.js");
var MaapError = require("../../../../lib/utils/MaapError.js");
var assert = require('assert');

describe("Column", function() {

	var indexModel = {
		collectionModel: {
			toString: function () {}
		}
	};

	describe("Column TU-42", function () {

		var attr = null;

		it("Viene creato con valori compatibili", function(done) {
			
			attr = new Column(indexModel, {
				name: "prova",
				label: "prova",
				transformation: function(){},
				sortable: true,
				selectable: true
			});

			done();
		});

		it("Viene sollevata un'eccezione con valori non compatibili", function(done) {
			
			assert.throws(
				function () {
					new Column(indexModel, {
						name: "prova",
						err: "prova",
						transformation: function(){},
						sortable: true,
						selectable: true
					});
				},
				MaapError
			);

			done();
		});
	});

	describe("getLabel() TU-43", function () {

		var column = new Column(indexModel, {
			name: "name",
			label: "label",
			transformation: function(){},
			sortable: true,
			selectable: true
		});

		it("Restituisce il campo label", function(done) {
			
			assert.strictEqual(column.getLabel(), "label");

			done();
		});
	});

	describe("getName() TU-44", function () {

		var column = new Column(indexModel, {
			name: "name",
			label: "label",
			transformation: function(){},
			sortable: true,
			selectable: true
		});

		it("Restituisce il campo name", function(done) {
			
			assert.strictEqual(column.getName(), "name");

			done();
		});
	});

	describe("getTransformation() TU-45", function () {

		var column = new Column(indexModel, {
			name: "name",
			label: "label",
			transformation: function(){},
			sortable: true,
			selectable: true
		});

		it("Restituisce il campo transformation", function(done) {
			
			assert.strictEqual(typeof column.getTransformation(), 'function');

			done();
		});
	});

	describe("isSelectable() TU-46", function () {

		var column = new Column(indexModel, {
			name: "name",
			label: "label",
			transformation: function(){},
			sortable: true,
			selectable: true
		});

		it("Restituisce il campo selectable", function(done) {
			
			assert.strictEqual(column.isSelectable(), true);

			done();
		});
	});

	describe("isSortable() TU-46", function () {

		var column = new Column(indexModel, {
			name: "name",
			label: "label",
			transformation: function(){},
			sortable: true,
			selectable: true
		});

		it("Restituisce il campo sortable", function(done) {
			
			assert.strictEqual(column.isSortable(), true);

			done();
		});
	});

	describe("toString() TU-155", function () {

		var column = new Column(indexModel, {
			name: "name",
			label: "label",
			transformation: function(){},
			sortable: true,
			selectable: true
		});

		it("Restituisce il campo name", function(done) {
			
			assert.strictEqual(column.toString(), "name");

			done();
		});
	});

	describe("setSelectable() TU-156", function () {

		var column = new Column(indexModel, {
			name: "name",
			label: "label",
			transformation: function(){},
			sortable: true,
			selectable: true
		});

		it("Imposta il campo selectable", function(done) {
			
			column.setSelectable(true);
			assert.strictEqual(column.isSelectable(), true);

			column.setSelectable(false);
			assert.strictEqual(column.isSelectable(), false);

			done();
		});
	});
});
