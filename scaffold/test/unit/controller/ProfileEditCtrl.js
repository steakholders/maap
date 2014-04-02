/*
 * Name : ProfileEditCtrl.js
 * Tested Module : Front-End::Controllers::ProfileEditController
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

describe('TU-106: ProfileEditCtrl', function () {
	var scope,  provachiamata, provachiamata2, MockProfileService;

	beforeEach(angular.mock.module('controllers'));

	beforeEach(function(){
		var utente = {
				"name":"Utente",
				"id" : "000000000",
				"level": "1"
			};
		MockProfileService = {
			update: function(value) {
				utente = {
						"name":"Utente",
						"id" : "000000000",
						"level": "2"
					};
				return utente;
			},
			get: function(value){
				return utente;
			}
		};
		spyOn(MockProfileService, 'get').andCallThrough();
		spyOn(MockProfileService, 'update').andCallThrough();
		provachiamata = MockProfileService.get();
		provachiamata2 = MockProfileService.update();
	});

	beforeEach(angular.mock.inject(function($rootScope, $controller){
		scope = $rootScope.$new();
		$controller('ProfileEditCtrl', {$scope: scope, ProfileService: MockProfileService});
	}));

	it('Mi aspetto che venga chiamato il metodo update', function(){
		expect(MockProfileService.update).toHaveBeenCalled();
	});

	it('Mi aspetto che lo scope non sia vuoto', function(){
        expect(scope).not.toBe([]);
	});
	it('Mi aspetto di ricevere la risposta in modo corretto', function(){
		expect(provachiamata).toEqual({
			"name":"Utente",
			"id" : "000000000",
			"level": "1"
		});
	});
	it('Mi aspetto di ricevere i dati utente modificati dopo aver chiamato edit', function(){
		expect(provachiamata2).toEqual({
			"name":"Utente",
			"id" : "000000000",
			"level": "2"
		});
	});
	/*it("Mi aspetto di ricevere una risposta vuota dopo aver eliminato l'utente", function(){
		prProfilehiamata2 = MockProfileService.update();
		expect(provachiamata2).toEqual({
			"name":"Utente2",
			"id" : "111111"
		});
	});*/
});