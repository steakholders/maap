/*
 * Name : ProfileCtrl.js
 * Tested Module : Front-End::Controllers::ProfileController
 * Location : /scaffold/test/unit/controllers
 *
 * History :
 *
 * Version         Date           Programmer
 * =================================================
 * 0.0.1           2014-03-01     Nicolò Tresoldi
 * -------------------------------------------------
 * Codifica Modulo.
 * =================================================
 */

'use strict';

describe('TU-104: ProfileCtrl', function () {
	var scope, MockUserService, provachiamata;

	beforeEach(angular.mock.module('controllers'));

	beforeEach(function(){
		MockUserService = {
			details: function(value) {
				return value;
			}
		};
		spyOn(MockUserService, 'details').andReturn([{
			"id":"0",
			"first_name":"Steak",
			"second_name":"Man",
			"email":"email@email.it"
		}]);
		provachiamata = MockUserService.details();
	});

	beforeEach(angular.mock.inject(function($rootScope, $controller){
		scope = $rootScope.$new();
		$controller('ProfileCtrl', {$scope: scope, UserService: MockUserService});
	}));

	it('Deve essere chiamato', function(){
		expect(MockUserService.details).toHaveBeenCalled();
	});
	it('Ritorna il json nel formato corretto, con il valore corretto', function(){
		expect(provachiamata).toEqual([{
			"id":"0",
			"first_name":"Steak",
			"second_name":"Man",
			"email":"email@email.it"
		}]);
	});
});