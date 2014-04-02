/*
 * Name : ForgetRequestCtrl.js
 * Tested Module : Front-End::Controllers::ForgetRequestController
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

describe('TU-101: ForgetRequestCtrl', function () {
	var scope, ForgotPasswordService, provachiamata;

	beforeEach(angular.mock.module('controllers'));

	beforeEach(function(){
		var newPassword = '';
		ForgotPasswordService = {
			request: function() {
				newPassword = '12345678';
				return newPassword;
			}
		};
		spyOn(ForgotPasswordService, 'request').andCallThrough();
		provachiamata = ForgotPasswordService.request();
	});

	beforeEach(angular.mock.inject(function($rootScope, $controller){
		scope = $rootScope.$new();
		$controller('ForgetRequestCtrl', {$scope: scope, ForgotPasswordService: ForgotPasswordService});
	}));

	it('Mi aspetto che venga chiamato il service', function(){
		expect(ForgotPasswordService.request).toHaveBeenCalled();
	});
	it('Mi aspetto che dopo la chiamata di request lo scope contenga la nuova password', function(){
		expect(provachiamata).toEqual('12345678');
	});
});