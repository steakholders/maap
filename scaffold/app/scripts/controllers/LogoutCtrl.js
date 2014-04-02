/*
* Name : Logout.js
* Module : Front-End::Controllers::LogoutController
* Location : /scaffold/app/scripts/controllers
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1           2014-03-03     Gianluca Donato
* -------------------------------------------------
* Codifica Modulo.
* =================================================
*/

"use strict";

angular.module('controllers')
	.controller('LogoutCtrl', [ "$scope", "$location", "ProfileService", "FlashMessage", "ErrorHandler", "Updater",
		function($scope, $location, ProfileService, FlashMessage, ErrorHandler, Updater) {
			ProfileService.logout({},
				function success() {
					Updater.setProfile();
					Updater.updateMenu();
					FlashMessage.future({ type: "success", title: "Logout", message: "You have successfully logged out" });
					$location.path('/login');
				},
				function err(error) {
					ErrorHandler.handle(error);
				}
			);
		}
	]);
