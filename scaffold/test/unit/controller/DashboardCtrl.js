/*
 * Name : DashBoardCtrl.js
 * Tested Module : Front-End::Controllers::DashboardController
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

describe('TU-99: DashboardCtrl', function () {
	var scope, MockollectionListService, provachiamata;

	beforeEach(angular.mock.module('controllers'));

	beforeEach(function(){
		MockollectionListService = {
			query: function(value) {
				return {
						"name":"NomeCollection"
					};
			}
		};
		spyOn(MockollectionListService, 'query').andCallThrough();
		provachiamata = MockollectionListService.query();
	});

	beforeEach(angular.mock.inject(function($rootScope, $controller){
		scope = $rootScope.$new();
		$controller('DashboardCtrl', {$scope: scope, UserService: MockollectionListService});
	}));

	it('Mi aspetto che venga chiamato il service', function(){
		expect(MockollectionListService.query).toHaveBeenCalled();
	});
	it('Mi aspetto che lo scope non sia vuoto', function(){
        expect(scope).not.toBe([]);
	});
	it('Mi aspetto di ricevere la risposta in modo corretto', function(){
		expect(provachiamata).toEqual({
			"name":"NomeCollection"
		});
	});
});