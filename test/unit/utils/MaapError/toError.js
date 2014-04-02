/*
 * Name : toError.js
 * Module : Back-end::Lib::Utils::MaapError
 * Location : /lib/utils
 *
 * History :
 *
 * Version         Date           Programmer
 * =================================================
 * 0.0.1          2014-03-04     Enrico Rotundo
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

	describe("toError() TU-8", function() {

		it("Viene creato un oggetto MaapError", function(done) {
			error = new MaapError(1000, "Login error", "Wrong username or password");
			done();
		});

		it("Ha un metodo chiamato toError", function(done) {
			assert.notEqual(error.toError, null);
			done();
		});

		it("Il metodo toError ritorna l'errore in formato Error", function(done) {
			var err = error.toError();
			assert.notEqual(err, null, "Il valore ritornato è null");
			assert.equal(err instanceof Error, true, "Il valore ritornato non è un Error");
			done();
		});
	});
});