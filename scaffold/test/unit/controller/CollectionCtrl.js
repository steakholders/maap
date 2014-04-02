/*
 * Name : CollectionCtrl.js
 * Tested Module : Front-End::Controllers::CollectionController
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

describe('TU-100: CollectionCtrl', function () {
	var scope, MockollectionService, provachiamata;

	beforeEach(angular.mock.module('controllers'));

	beforeEach(function(){
		MockollectionService = {
			query: function(value) {
				return {
						"_id" : { "$oid" : "53217b62f33ab349012ed581" }, 
						"value" : "John"
					};
			}
		};
		spyOn(MockollectionService, 'query').andCallThrough();
		provachiamata = MockollectionService.query();
	});

	beforeEach(angular.mock.inject(function($rootScope, $controller){
		scope = $rootScope.$new();
		$controller('CollectionCtrl', {$scope: scope, UserService: MockollectionService});
	}));

	it('Mi aspetto che venga chiamato il service', function(){
		expect(MockollectionService.query).toHaveBeenCalled();
	});
	it('Mi aspetto che lo scope non sia vuoto', function(){
        expect(scope).not.toBe([]);
	});
	it('Mi aspetto di ricevere la risposta in modo corretto', function(){
		expect(provachiamata).toEqual({
			"_id" : { "$oid" : "53217b62f33ab349012ed581" }, 
			"value" : "John"
		});
	});
});