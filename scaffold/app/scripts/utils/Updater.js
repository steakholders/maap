/*
* Name : Updater.js
* Module : Front-End::Services
* Location : /scaffold/app/scripts/utils
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1           2014-03-01     Federico Poli
* -------------------------------------------------
* Codifica Modulo.
* =================================================
*/

"use strict";

angular.module("utils")
	.factory('Updater', ["$rootScope", "ProfileService", "CollectionListService",
		function($rootScope, ProfileService, CollectionListService) {
			// Quando serve aggiornare lo stato dell'utente salva i parametri utili
			// a tutti i controller nello $rootScope
			var setProfile = function(profile) {
				if (profile === undefined) {
					$rootScope.isLogged = false;
					$rootScope.level = "0";
					$rootScope.role = "Unhautenticated User";
					$rootScope.isAdmin = false;
					$rootScope.isSuperAdmin = false;
					$rootScope.profile = {};
				}
				else {
					$rootScope.isLogged = true;

					if (profile.level === "2" || profile.level === "3") {
						$rootScope.isAdmin = true;
					} else {
						$rootScope.isAdmin = false;
					}

					if (profile.level === "3") {
						$rootScope.isSuperAdmin = true;
					} else {
						$rootScope.isSuperAdmin = false;
					}

					if (profile.level === "1") {
						profile.role = "Base User";
					}
					if (profile.level === "2") {
						profile.role = "Admin";
					}
					if (profile.level === "3") {
						profile.role = "Super Admin";
					}
					
					$rootScope.profile = profile;
				}
			};

			// Richiedi al server il profilo dell'utente
			var updateProfile = function(callback, errback) {
				ProfileService.get(
					function success(data) {
						setProfile(data);
						if (callback) {
							callback(data);
						}
					},
					function err(error) {
						setProfile();
						if (errback) {
							errback(error);
						}
					}
				);
			};
			
			var setMenu = function(data) {
				if (data === undefined) {
					$rootScope.collections = [];
				} else {
					$rootScope.collections = data;
				}
			};
			
			var updateMenu = function(callback, errback) {
				CollectionListService.query({},
					function success(data) {
						setMenu(data);
						if (callback) {
							callback(data);
						}
					},
					function err(error){
						setMenu();
						if (errback) {
							errback(error);
						}
					}
				);
			};

			return {
				setProfile: setProfile,
				updateProfile: updateProfile,
				setMenu: setMenu,
				updateMenu: updateMenu
			};
		}
	]);
