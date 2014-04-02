/*
* Name : ErrorHandler.js
* Module : UnitTest
* Location : /lib/controller/middleware
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1           2014-02-28     Luca De Franceschi
* -------------------------------------------------
* Codifica test
* =================================================
*/
'use strict';

var ErrorHandler = require("../../../../lib/controller/middleware/ErrorHandler");
var MaapError = require("../../../../lib/utils/MaapError");
var assert = require('assert'); 

describe('ErrorHandler', function() {

	var req;
	var res = {
		json: null
	};

	describe('handler() TU-68', function() {

		it("Gestisce il caso in cui l'errore sia di tipo MaapError", function(done) {

			res.json = function (param, err) {
				assert.deepEqual(err, new MaapError(1000));
			};

			ErrorHandler.handler(new MaapError(1000), req, res, function () {
				done(new Error());
			});

			done();
		});

		it("Gestisce il caso in cui l'errore non sia di tipo MaapError", function(done) {

			res.json = function (param, err) {
				assert.deepEqual(err, new MaapError(1000));
			};

			ErrorHandler.handler(1000, req, res, function () {
				done(new Error());
			});

			done();
		});
	});
});