/*
 * Name : ForgetResetCtrl.js
 * Tested Module : Front-End::Controllers::ForgetResetController
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

describe('TU-105: ForgetResetCtrl', function () {
	var scope, ForgotPasswordService, provachiamata;

	beforeEach(angular.mock.module('controllers'));

	beforeEach(function(){
		var password = 'password';
		ForgotPasswordService = {
			reset: function(value) {
				password = '';
				return password;
			}
		};
		spyOn(ForgotPasswordService, 'reset').andCallThrough();
		provachiamata = ForgotPasswordService.reset();
	});

	beforeEach(angular.mock.inject(function($rootScope, $controller){
		scope = $rootScope.$new();
		$controller('ForgetResetCtrl', {$scope: scope, ForgotPasswordService: ForgotPasswordService});
	}));

	it('Mi aspetto che venga chiamato il service', function(){
		expect(ForgotPasswordService.reset).toHaveBeenCalled();
	});
	it('Mi aspetto che dopo la chiamata di reset la password non sia più definita', function(){
		expect(provachiamata).toEqual('');
	});
});