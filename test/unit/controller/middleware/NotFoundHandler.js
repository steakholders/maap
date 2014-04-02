/*
* Name : NotFoundHandler.js
* Module : UnitTest
* Location : /test/unit/middleware/
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1          2014-02-28      Giacomo Fornari     
* -------------------------------------------------
* Codifica Test
* =================================================
*/

"use strict";

var NotFoundHandler = require("../../../../lib/controller/middleware/NotFoundHandler");
var assert = require('assert');

describe("NotFoundHandler", function() {

	describe("NotFoundHandler TU-69", function() {
		var handler = NotFoundHandler.handler;
		var req, res, next;

		beforeEach(function(done){
			// Prepara gli stub
			req = {};
			res = {
				json: function(){}
			};
			next = function(){};
			done();
		});

		it("Risponde con il codice http 404", function(done) {
			// Inietta un test nello stub
			res.json = function(code, data) {
				assert.equal(code, 404);
				done();
			};
			handler(req, res, next);
		});

		it("Risponde con l'oggetto di errore atteso", function(done) {
			// Inietta un test nello stub
			res.json = function(code, data) {
				var expectedData = {
					code: 6000,
					title: "Not found",
					message: "The resource you requested does not exist"
				};
				assert.deepEqual(data, expectedData);
				done();
			};
			handler(req, res, next);
		});

		it("Non passa il controllo al successivo next", function(done) {
			// Inietta un test nello stub
			next = function(code, data) {
				done("È stata fatta una chiamata a next");
			};
			handler(req, res, next);
			done();
		});
	});

	describe("handler() TU-76", function() {

		var handler = NotFoundHandler.handler;
		var req, res, next;

		req = {};
		res = {
			json: function(){}
		};
		next = function(){};

		it("Risponde con il codice http 404", function(done) {
			// Inietta un test nello stub
			res.json = function(code, data) {
				assert.equal(code, 404);
				done();
			};
			handler(req, res, next);
		});
	});
});