/*
* Name : RegisterService.js
* Module : Fornt-End::Services::RegisterService
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

//Necessario per jshint che altrimenti da errore alla riga 21
/*global _:false */

'use strict';
 
describe('TU-114: RegisterService', function(){
	var RegisterService, $httpBackend;
   
	beforeEach(angular.mock.module('services'));

	beforeEach(inject(function (_RegisterService_, _$httpBackend_) {
		RegisterService = _RegisterService_;
		$httpBackend = _$httpBackend_;
		//$httpBackend.whenPOST('/register', 'aaaa').respond('aaaa');
		var data= 'user'; 
		$httpBackend.expectPOST('/register',data ).respond(200, 'Success');
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

	it("should register new user", function () {
		expect(RegisterService.signup('user')).toBeDefined();
		$httpBackend.flush();
	});


});
