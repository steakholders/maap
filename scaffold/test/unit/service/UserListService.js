/*
* Name : UserListService.js
* Module : Fornt-End::Services::UserListService
* Location : /scaffold/test/unit/services
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1           2014-03-25     Nicolò Tresoldi
* -------------------------------------------------
* Codifica Modulo.
* =================================================
*/

/*global _:false */
'use strict';
 
describe('TU-88, TU-90: UserListService', function(){
	var UserListService, $httpBackend;
   
	beforeEach(angular.mock.module('services'));

	beforeEach(inject(function (_UserListService_, _$httpBackend_ ) {
		UserListService = _UserListService_;
		$httpBackend = _$httpBackend_;
		var utente = { email: 'user1@gmail.com', id: '00000' };
		$httpBackend.when('GET', '/users').respond(utente);
		$httpBackend.when('POST', '/users').respond();
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

	it("should get the list of users", function () {
		$httpBackend.expectGET('/users');
		var chiamata = UserListService.query();
		expect(chiamata).toBeDefined();
		$httpBackend.flush();
		//expect(chiamata).toDeepEqual({ email: 'user1@gmail.com', id: '00000' });
	});

	it("should call save", function () {
		$httpBackend.expectPOST('/users');
		var chiamata = UserListService.save();
		expect(chiamata).toBeDefined();
		$httpBackend.flush();
	});
});
