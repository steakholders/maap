/*
 * Name : mailer.js
 * Module : Back-end::Lib::Utils::MaapError
 * Location : /lib/utils
 *
 * History :
 *
 * Version         Date           Programmer
 * =================================================
 * 0.0.1          2014-02-28     Federico Poli
 * -------------------------------------------------
 * ...
 * Codifica test.
 * ...
 * =================================================
 */

"use strict";

var MaapError = require("../../../../lib/utils/MaapError");
var assert = require('assert');

describe("MaapError", function() {
	var error = null;

	describe("toDict() TU-6", function() {

		it("Viene creato un oggetto MaapError", function(done) {
			error = new MaapError(1000, "Login error", "Wrong username or password");
			done();
		});

		it("Ha un metodo chiamato toDict", function(done) {
			assert.notEqual(error.toDict, null);
			done();
		});

		it("Il metodo toDict ritorna un oggetto", function(done) {
			var dict = error.toDict();
			assert.notEqual(dict, null, "Il valore ritornato è null");
			assert.equal(typeof dict, "object", "Il valore ritornato non è un object");
			done();
		});
	});
});