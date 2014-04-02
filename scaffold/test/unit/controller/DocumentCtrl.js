/*
 * Name : DocumentCtrl.js
 * Tested Module : Front-End::Controllers::DocumentController
 * Location : /scaffold/test/unit/controllers
 *
 * History :
 *
 * Version         Date           Programmer
 * =================================================
 * 0.0.1           2014-02-28     Nicolò Tresoldi
 * -------------------------------------------------
 * Codifica Modulo.
 * =================================================
 */

'use strict';

describe('TU-98: DocumentCtrl', function () {
	var scope, MockDocumentService, provachiamata;

	beforeEach(angular.mock.module('controllers'));

	beforeEach(function(){
		MockDocumentService = {
			query: function(value) {
				return {
					"_id" : { "$oid" : "53217b62f33ab349012ed581" },
					"name" : "John", 
					"surname" : "Nash", 
					"sex" : "Male", 
					"country" : "USA",
					"email" : "john.nash@gmail.com", 
					"orders" : 100, 
					"age" : 45 
				};
			}
		};
		spyOn(MockDocumentService, 'query').andCallThrough();
		provachiamata = MockDocumentService.query();
	});

	beforeEach(angular.mock.inject(function($rootScope, $controller){
		scope = $rootScope.$new();
		$controller('DocumentCtrl', {$scope: scope, UserService: MockDocumentService});
	}));

	it('Mi aspetto che venga chiamato il service', function(){
		expect(MockDocumentService.query).toHaveBeenCalled();
	});
	it('Mi aspetto che lo scope non sia vuoto', function(){
        expect(scope).not.toBe([]);
	});
	it('Mi aspetto di ricevere la risposta in modo corretto', function(){
		expect(provachiamata).toEqual({
			"_id" : { "$oid" : "53217b62f33ab349012ed581" },
			"name" : "John", 
			"surname" : "Nash", 
			"sex" : "Male", 
			"country" : "USA",
			"email" : "john.nash@gmail.com", 
			"orders" : 100, 
			"age" : 45 
		});
	});
});