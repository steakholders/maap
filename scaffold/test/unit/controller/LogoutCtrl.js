/*
 * Name : LogoutCtrl.js
 * Tested Module : Front-End::Controllers::LogoutController
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

describe('TU-95: LogoutCtrl', function () {
	var scope, MockProfileService, provachiamata;

	beforeEach(angular.mock.module('controllers'));

	beforeEach(function(){
		MockProfileService = {
			logout: function() {
			}
		};
		spyOn(MockProfileService, 'logout').andCallThrough();
		provachiamata = MockProfileService.logout();
	});

	beforeEach(angular.mock.inject(function($rootScope, $controller){
		scope = $rootScope.$new();
		$controller('LogoutCtrl', {$scope: scope, UserService: MockProfileService});
	}));

	it('Deve essere chiamato', function(){
		expect(MockProfileService.logout).toHaveBeenCalled();
	});
});