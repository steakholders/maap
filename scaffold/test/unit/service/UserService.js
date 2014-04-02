/*
* Name : UserService.js
* Module : Fornt-End::Services::UserService
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
 
describe('TU-82, TU-83, TU-84: UserService', function(){
	var UserService, $httpBackend;
   
	beforeEach(angular.mock.module('services'));

	beforeEach(inject(function (_UserService_, _$httpBackend_ ) {
		UserService = _UserService_;
		$httpBackend = _$httpBackend_;
		var utente = { email: 'gian@gmail.com', level: 'a' };
		$httpBackend.when('GET', '/users/532adea92c163256d59db0d8').respond(utente);
		$httpBackend.when('PUT', '/users/532adea92c163256d59db0d8').respond(update());
		$httpBackend.when('DELETE', '/users/532adea92c163256d59db0d8').respond(utente);	
		function update(){
			utente = { email: 'admin@gmail.com', level: 'a' };
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

	it("should make a call at /users with an ID", function () {
		var id = '532adea92c163256d59db0d8';
		$httpBackend.expect('GET','/users/'+id);
		var chiamata = UserService.get({ id: id });
		$httpBackend.flush();
		expect(chiamata).toBeDefined();
	});

	/*it("should return correct JSON of user with that ID", function () {
		var id = '532adea92c163256d59db0d8';
		$httpBackend.expect('GET','/users/'+id);
		var chiamata = UserService.get({ id: id });
		$httpBackend.flush();
		//Viene utilizzato il matcher custom
		expect(chiamata).toDeepEqual({ email: 'gian@gmail.com', level: 'a' });
	});*/

	it("should update the users with that ID", function () {
		var id = '532adea92c163256d59db0d8';
		$httpBackend.expect('PUT','/users/'+id);
		var chiamata = UserService.update({ id: id });
		$httpBackend.flush();
		expect(chiamata).toBeDefined();
		//expect(chiamata).toDeepEqual({ email: 'admin@gmail.com', level: 'a' });
	});

	it("should delete the users with that ID", function () {
		var id = '532adea92c163256d59db0d8';
		$httpBackend.expect('DELETE','/users/'+id);
		var chiamata = UserService.remove({ id: id });
		$httpBackend.flush();
		expect(chiamata).toBeDefined();
	});

});
