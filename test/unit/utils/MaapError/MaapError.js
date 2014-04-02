/*
 * Name : MaapError.js
 * Module : Back-end::Lib::Utils::MaapError
 * Location : /lib/utils
 *
 * History :
 *
 * Version         Date           Programmer
 * =================================================
 * 0.0.1          2014-03-03     Federico Poli
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

	describe("MaapError TU-5", function() {

		it("Viene creato un oggetto MaapError", function(done) {
			error = new MaapError(1000, "Login error", "Wrong username or password");
			done();
		});

		it("L'oggetto non è nullo", function(done) {
			assert.notEqual(error, null);
			done();
		});
	});
});
