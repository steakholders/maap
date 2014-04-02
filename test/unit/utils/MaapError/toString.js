/*
 * Name : toString.js
 * Module : Back-end::Lib::Utils::MaapError
 * Location : /lib/utils
 *
 * History :
 *
 * Version         Date           Programmer
 * =================================================
 * 0.0.0          2014-03-05     Federico Poli
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

	describe("toString() TU-7", function() {

		it("Viene creato un oggetto MaapError", function(done) {
			error = new MaapError(1000, "Login error", "Wrong username or password");
			done();
		});

		it("Ha un metodo chiamato toString", function(done) {
			assert.notEqual(error.toString, null);
			done();
		});

		it("Il metodo toString ritorna l'errore in formato String", function(done) {
			var val = error.toString();
			assert.notEqual(val, null, "Il valore ritornato è null");
			assert.equal(typeof val, "string", "Il valore ritornato non è una String");
			done();
		});
	});
});