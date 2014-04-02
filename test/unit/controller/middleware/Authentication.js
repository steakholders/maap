/*
* Name : Authentication.js
* Module : UnitTest
* Location : /test/unit/controller/middleware
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1           2014-02-27     Federico Poli 
* -------------------------------------------------
* Codifica test
* =================================================
*/
'use strict';

var should = require('should'); 
var Authentication = require("../../../../lib/controller/middleware/Authentication");

describe('Authentication', function() {
	/*before(function(done) {
	});*/
	var user = function(e,p,l) {
		this.email = e;
		this.pass = p;
		this.level = l;
	};

	var req = function(is,userLevel) { //is Serve che sia true nel caso l'utente sia loggato e False nel caso non sia loggato
		if (is) {this.user = new user("esempio@email.it","pass",userLevel);}
		this.isAuthenticated = function isAuthenticated(){ return is; };
	};
		
	var res = function() {
		this.statusCode = null;
		this.maapError = null; 
		
		var self = this;
		this.json = function (status, maapE) {
			self.maapError = maapE;
			self.statusCode = status;
		};
	};

	describe('requireLogged() TU-80', function() {

		it("Dovrebbe fallire se l'utente non ha eseguito login", function(done) {
			var response = new res();
			var request = new req(false,"1");
			Authentication.requireLogged(request,response,function(err){});
			response.statusCode.should.equal(401);
			done();
		});

		it("Dovrebbe aver successo se l'utente ha eseguito il login", function(done) {
			var response = new res();
			var request = new req(true,"1");
			Authentication.requireLogged(request,response,function(err){});
			should.not.exist(response.statusCode);
			done();
		});
	});

	describe('requireNotLogged() TU-81', function() {

		it("Dovrebbe fallire se l'utente ha eseguito il login", function(done) {
			var response = new res();
			var request = new req(true,"1"); //Login : true, livello utente : 1
			Authentication.requireNotLogged(request,response,function(err){});
			response.statusCode.should.equal(401);
			done();
		});

		it("Dovrebbe aver successo se l'utente non ha eseguito il login", function(done) {
			var response = new res();
			var request = new req(false,"1");
			Authentication.requireNotLogged(request,response,function(err){});
			should.not.exist(req.user);
			done();
		});

	});

	describe('requireAdmin() TU-79', function() {
		it("Dovrebbe fallire se l'utente non è autenticato", function(done) {
			var response = new res();
			var request = new req(false,"1"); // livello utente : Utente base (1)
			Authentication.requireAdmin(request,response,function(err){});
			response.statusCode.should.equal(401);
			done();
		});

		it("Dovrebbe fallire se l'utente non ha permessi Admin", function(done) {
			var response = new res();
			var request = new req(true,"1"); // livello utente : Utente base (1)
			Authentication.requireAdmin(request,response,function(err){});
			response.statusCode.should.equal(401);
			done();
		});

		it("Dovrebbe aver successo se l'utente ha permessi Admin", function(done) {
			var response = new res();
			var request = new req(true,"2"); // livello utente : Admin (2)
			Authentication.requireAdmin(request,response,function(err){});
			should.not.exist(response.statusCode);
			done();
		});

		it("Dovrebbe aver successo se l'utente ha permessi Super Admin", function(done) {
			var response = new res();
			var request = new req(true,"3"); // livello utente : Super Admin (3)
			Authentication.requireAdmin(request,response,function(err){});
			should.not.exist(response.statusCode);
			done();
		});
	});

	describe('requireSuperAdmin() TU-82', function() {
		it("Dovrebbe fallire se l'utente non è autenticato", function(done) {
			var response = new res();
			var request = new req(true,"1"); // livello utente : Utente base (1)
			Authentication.requireAdmin(request,response,function(err){});
			response.statusCode.should.equal(401);
			done();
		});

		it("Dovrebbe fallire se l'utente non ha permessi Super Admin", function(done) {
			var response = new res();
			var request = new req(true,"1"); // livello utente : Utente base (1)
			Authentication.requireAdmin(request,response,function(err){});
			response.statusCode.should.equal(401);
			done();
		});

		it("Dovrebbe aver successo se l'utente ha permessi Super Admin", function(done) {
			var response = new res();
			var request = new req(true,"3"); // livello utente : Super Admin (3)
			Authentication.requireAdmin(request,response,function(err){});
			should.not.exist(response.statusCode);
			done();
		});
	});
});