/*
 * Name : UserListCtrl.js
 * Tested Module : Front-End::Controllers::UserListController
 * Location : /scaffold/test/unit/controllers
 *
 * History :
 *
 * Version         Date           Programmer
 * =================================================
 * 0.0.1           2014-03-21     Nicolò Tresoldi
 * -------------------------------------------------
 * Codifica Modulo.
 * =================================================
 */

'use strict';

describe('TU-103: UserListCtrl', function () {
	var scope, MockUserListService, provachiamata, provachiamata2, MockUserService;

	beforeEach(angular.mock.module('controllers'));

	beforeEach(function(){
		MockUserListService = {
			query: function(value) {
				return {
						"name":"Utente",
						"id" : "000000000"
					};
			}
		};

		spyOn(MockUserListService, 'query').andCallThrough();
		provachiamata = MockUserListService.query();
	});
	beforeEach(function(){
		MockUserService = {
			remove: function(value) {
			}
		};
		spyOn(MockUserService, 'remove').andCallThrough();
		provachiamata2 = MockUserService.remove();
	});

	beforeEach(angular.mock.inject(function($rootScope, $controller){
		scope = $rootScope.$new();
		$controller('UserListCtrl', {$scope: scope, UserListService: MockUserListService, UserService: MockUserService});
	}));

	it('Mi aspetto che venga chiamato il service UserListService', function(){
		expect(MockUserListService.query).toHaveBeenCalled();
	});

	it('Mi aspetto che venga chiamato il service UserService', function(){
		expect(MockUserService.remove).toHaveBeenCalled();
	});

	it('Mi aspetto che lo scope non sia vuoto', function(){
        expect(scope).not.toBe([]);
	});
	it('Mi aspetto di ricevere la risposta in modo corretto', function(){
		expect(provachiamata).toEqual({
			"name":"Utente",
			"id" : "000000000"
		});
	});
	it("Mi aspetto di ricevere una risposta vuota dopo aver eliminato l'utente", function(){
		provachiamata = MockUserService.remove();
		expect(provachiamata).toBe();
	});
});