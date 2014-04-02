/*
* Name : ProfileService.js
* Module : Fornt-End::Services::ProfileService
* Location : /scaffold/test/unit/services
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1           2014-03-24     Nicolò Tresoldi
* -------------------------------------------------
* Codifica Modulo.
* =================================================
*/

/*global _:false */
'use strict';
 
describe('TU-91, TU-92, TU-111, TU-112: ProfileService', function(){
	var ProfileService, $httpBackend;
   
	beforeEach(angular.mock.module('services'));

	beforeEach(inject(function (_ProfileService_, _$httpBackend_ ) {
		ProfileService = _ProfileService_;
		$httpBackend = _$httpBackend_;
		var utente = { email: 'gian@gmail.com', level: 'a' };
		$httpBackend.when('GET', '/profile').respond(utente);
		$httpBackend.when('PUT', '/profile').respond(update());
		$httpBackend.when('DELETE', '/profile').respond(200);	
		var data= 'login'; 
		$httpBackend.whenPOST('/profile',data ).respond(login());
		function update(){
			utente = { email: 'admin@gmail.com', level: 'a' };
			return utente;
		}
		function login(){
			utente = { email: 'gian@gmail.com', level: 'a' };
			return utente;
		}
	}));

	//Creo un matcher di jasmine personalizzato per la verifica del jason, utilizzo la libreria underscore
	beforeEach(function() {
		this.addMatchers({
			toDeepEqual: function(expected) {
				return _.isEqual(JSON.stringify(this.actual), JSON.stringify(expected));
			}
		});
	});

	//Verifico che sono stati invocati solamente i metodi aspettati	//
	afterEach(function () {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it("should make a call at /profile", function () {
		$httpBackend.expect('GET','/profile');
		var chiamata = ProfileService.get();
		$httpBackend.flush();
		expect(chiamata).toBeDefined();
		//expect(chiamata).toDeepEqual({ email: 'gian@gmail.com', level: 'a' });
	});

	it("should update the user's profile", function () {
		$httpBackend.expect('PUT','/profile');
		var chiamata = ProfileService.update();
		$httpBackend.flush();
		expect(chiamata).toBeDefined();
		//expect(chiamata).toDeepEqual({ email: 'admin@gmail.com', level: 'a' });
	});
	it("should logout the user", function () {
		$httpBackend.expect('DELETE','/profile');
		var chiamata = ProfileService.logout();
		$httpBackend.flush();
		expect(chiamata).toBeDefined();
	});

	it("should signin user", function () {
		expect(ProfileService.login('login')).toBeDefined();
		$httpBackend.flush();
	});

});
