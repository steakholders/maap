/*
* Name : ForgotPasswordService.js
* Module : Fornt-End::Services::ForgotPasswordService
* Location : /scaffold/test/unit/services
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1           2014-03-24    Nicolò Tresoldi
* -------------------------------------------------
* Codifica Modulo.
* =================================================
*/

'use strict';
 
describe('TU-115, TU-116: ForgotPasswordService', function(){
	var ForgotPasswordService, $httpBackend;
   
	beforeEach(angular.mock.module('services'));

	beforeEach(inject(function (_ForgotPasswordService_, _$httpBackend_ ) {
		ForgotPasswordService = _ForgotPasswordService_;
		$httpBackend = _$httpBackend_;
		$httpBackend.when('PUT', '/password/forgot').respond(200);
		var data = 'pass';
		$httpBackend.whenPOST('/password/forgot',data ).respond(200, 'success');
	}));

	//Verifico che sono stati invocati solamente i metodi aspettati	//
	afterEach(function () {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it("should reset user's password", function () {
		$httpBackend.expect('PUT','/password/forgot');
		var chiamata = ForgotPasswordService.reset();
		$httpBackend.flush();
		expect(chiamata).toBeDefined();
	});

	it("should update new user's password", function () {
		$httpBackend.expect('POST','/password/forgot');
		var chiamata = ForgotPasswordService.request('pass');
		$httpBackend.flush();
		expect(chiamata).toBeDefined();
	});

});
