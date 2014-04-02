/*
* Name : CollectionListService.js
* Module : Fornt-End::Services::CollectionListService
* Location : /scaffold/test/unit/services
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1           2014-03-06     Nicolò Tresoldi
* -------------------------------------------------
* Codifica Modulo.
* =================================================
*/

//Necessario per jshint che altrimenti da errore alla riga 21
/*global _:false */

'use strict';
 
describe('TU-87: CollectionListService', function(){
	var CollectionListService, $httpBackend;
   
	beforeEach(angular.mock.module('services'));

	beforeEach(inject(function (_CollectionListService_, _$httpBackend_) {
		CollectionListService = _CollectionListService_;
		$httpBackend = _$httpBackend_;
		$httpBackend.whenGET('/collections').respond([{ name: 'RandomCollection' }]);	
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

	it("should make a call /collections", function () {
		$httpBackend.expectGET('/collections');
		expect(CollectionListService.query()).toBeDefined();
		$httpBackend.flush();
	});

	it("should return correct json", function () {
		

		$httpBackend.expectGET('/collections');
		
		var chiamata = CollectionListService.query();
		$httpBackend.flush();
		//Viene utilizzato il matcher custom
		expect(chiamata).toDeepEqual([{ name: 'RandomCollection' }]);
		
	});

});
