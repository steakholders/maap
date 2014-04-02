/*
 * Name : LoginCtrl.js
 * Tested Module : Front-End::Controllers::LoginController
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

describe('TU-93, TU-94: LoginCtrl', function () {
	var scope, MockProfileService, provachiamata;

	beforeEach(angular.mock.module('controllers'));

	beforeEach(function(){
		MockProfileService = {
			login: function() {
			}
		};
		spyOn(MockProfileService, 'login').andReturn([{
			"email": "email@email.it",
			"password": "prova"
		}]);
		provachiamata = MockProfileService.login();
	});

	beforeEach(angular.mock.inject(function($rootScope, $controller){
		scope = $rootScope.$new();
		$controller('LoginCtrl', {$scope: scope, UserService: MockProfileService});
	}));

	it('Deve essere chiamato', function(){
		expect(MockProfileService.login).toHaveBeenCalled();
	});
	it('Preleva i dati con il formato corretto.', function(){
		expect(provachiamata).toEqual([{
			"email": "email@email.it",
			"password": "prova"
		}]);
	});
});