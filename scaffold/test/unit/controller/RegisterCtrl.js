/*
 * Name : RegisterCtrl.js
 * Tested Module : Front-End::Controllers::RegisterController
 * Location : /scaffold/test/unit/controllers
 *
 * History :
 *
 * Version         Date           Programmer
 * =================================================
 * 0.0.1           2014-03-20     Nicolò Tresoldi
 * -------------------------------------------------
 * Codifica Modulo.
 * =================================================
 */

'use strict';

describe('TU-113: RegisterCtrl', function () {
	var scope, MockRegisterService, provachiamata;

	beforeEach(angular.mock.module('controllers'));

	beforeEach(function(){
		MockRegisterService = {
			signup: function() {
			}
		};
		spyOn(MockRegisterService, 'signup').andReturn([{
			"email": "email@email.it",
			"password": "prova",
			"confirmPassword": "prova"
		}]);
		provachiamata = MockRegisterService.signup();
	});

	beforeEach(angular.mock.inject(function($rootScope, $controller){
		scope = $rootScope.$new();
		$controller('RegisterCtrl', {$scope: scope, RegisterService: MockRegisterService});
	}));

	it('Deve essere chiamato', function(){
		expect(MockRegisterService.signup).toHaveBeenCalled();
	});
	it('Preleva i dati con il formato corretto.', function(){
		expect(provachiamata).toEqual([{
			"email": "email@email.it",
			"password": "prova",
			"confirmPassword": "prova"
		}]);
	});
});