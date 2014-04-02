/*
* Name : ShowService.js
* Module : Back-end::Lib::Controller::Service::ShowService
* Location : /test/
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1           2014-03-04     Luca De Franceschi
* -------------------------------------------------
* ...
* Codifica modulo.
* ...
* =================================================
*/
"use strict";


// Viene verificato che il metodo restituisca un puntatore alla classe Back-end::Lib::Controller::Controller::UserController e che quest'ultimo non sia nullo.

var assert = require('assert');
var serviceFactory = require("../../../../lib/controller/service");
// var userService = require("../../../../lib/controller/service/UserService");


describe("ServiceFactory", function() {

	describe("getUserController() TU-60", function() {

		var userController = null;

		it("Richiede userController non nullo", function(done) {
			userController = serviceFactory.getUserService();
			assert.notEqual(userController, null, "getUserService ha ritornato null");
			done();
		});

		it("Controllo che sia una object", function(done) {
			assert.equal(typeof userController, "object", "Il valore ritornato non è un object");
			done();
		});

	});

	describe("getUserController() TU-61", function() {

		var showController = null;

		it("Richiede showController non nullo", function(done) {
			showController = serviceFactory.getShowService();
			assert.notEqual(showController, null, "getShowService ha ritornato null");
			done();
		});

		it("Controllo che sia una object", function(done) {
			assert.equal(typeof showController, "object", "Il valore ritornato non è un object");
			done();
		});

	});


	describe("getIndexController() TU-62", function() {

		var indexController = null;

		it("Richiede showController non nullo", function(done) {
			indexController = serviceFactory.getIndexService();
			assert.notEqual(indexController, null, "getIndexService ha ritornato null");
			done();
		});

		it("Controllo che sia una object", function(done) {
			assert.equal(typeof indexController, "object", "Il valore ritornato non è un object");
			done();
		});

	});

});