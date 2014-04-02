/*
 * Name : DslLoaderHandler.js
 * Module : UnitTest
 * Location : /test/unit/
 *
 * History :
 *
 * Version         Date           Programmer
 * =================================================
 * 0.0.1          2014-03-05      Giacomo Fornari
 * -------------------------------------------------
 * Codifica test
 * =================================================
 * 0.0.2          2014-03-27     Luca De Franceschi
 * -------------------------------------------------
 * Incremento test.
 * =================================================
 */

"use strict";

var DslLoaderHandler = require("../../../../lib/controller/middleware/DslLoaderHandler");
var assert = require('assert');

describe("DslLoaderHandler", function() {

	var app = {
		db: {
			data: null
		},
		use: function () {},
		config: {
			collectionPath: "path"
		}
	};

	describe("DslLoaderHandler TU-63", function() {
		var loader = null;

		it("Viene costruito", function(done) {
			loader = new DslLoaderHandler();
			done();
		});

		it("Ha un metodo init", function(done) {
			assert.notEqual(loader.init, null, "Il metodo init non è presente");
			done();
		});

		it("Ha un metodo loadDsl", function(done) {
			assert.notEqual(loader.loadDsl, null, "Il metodo loadDsl non è presente");
			done();
		});

		it("Ha un metodo handle", function(done) {
			assert.notEqual(loader.handle, null, "Il metodo handle non è presente");
			done();
		});
	});

	describe("init() TU-66", function() {

		it("Viene inizializzato", function(done) {

			var StubClass = {
				dslDomain: {
					init: null
				},
				loadDsl: null
			};

			StubClass.loadDsl = function (path) {
				assert.strictEqual(path, "path/");
			};

			StubClass.dslDomain.init = function (cb, eb) {
				cb();
			};

			StubClass.init = DslLoaderHandler.prototype.init;

			StubClass.init(app);

			done();
		});

		it("Gestisce gli errori di inizializzazione di dslDomain", function(done) {

			var StubClass = {
				dslDomain: {
					init: null
				},
				loadDsl: null
			};

			StubClass.loadDsl = function (path) {
				assert.strictEqual(path, "path/");
			};

			StubClass.dslDomain.init = function (cb, eb) {
				eb("error");
			};

			StubClass.init = DslLoaderHandler.prototype.init;

			StubClass.init(app);

			done();
		});
	});
});