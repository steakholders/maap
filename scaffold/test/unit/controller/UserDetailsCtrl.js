/*
 * Name : UserDetailsCtrl.js
 * Tested Module : Front-End::Controllers::UserDetailsController
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

describe('TU-10, TU-97: UserDetailsCtrl', function () {
	var scope,  provachiamata, provachiamata2, MockUserService;

	beforeEach(angular.mock.module('controllers'));

	beforeEach(function(){
		var utente = {
				"name":"Utente",
				"id" : "000000000"
			};
		MockUserService = {
			update: function(value) {
				utente = {
						"name":"Utente2",
						"id" : "111111"
					};
				return utente;
			},
			get: function(value){
				return utente;
			}
		};
		spyOn(MockUserService, 'get').andCallThrough();
		spyOn(MockUserService, 'update').andCallThrough();
		provachiamata = MockUserService.get();
		provachiamata2 = MockUserService.update();
	});

	beforeEach(angular.mock.inject(function($rootScope, $controller){
		scope = $rootScope.$new();
		$controller('UserListCtrl', {$scope: scope, UserService: MockUserService});
	}));

	it('Mi aspetto che venga chiamato il metodo get', function(){
		expect(MockUserService.get).toHaveBeenCalled();
	});

	it('Mi aspetto che venga chiamato il metodo update', function(){
		expect(MockUserService.update).toHaveBeenCalled();
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
	it('Mi aspetto di ricevere i dati utente modificati dopo aver chiamato edit', function(){
		expect(provachiamata2).toEqual({
			"name":"Utente2",
			"id" : "111111"
		});
	});
	/*it("Mi aspetto di ricevere una risposta vuota dopo aver eliminato l'utente", function(){
		provachiamata2 = MockUserService.update();
		expect(provachiamata2).toEqual({
			"name":"Utente2",
			"id" : "111111"
		});
	});*/
});