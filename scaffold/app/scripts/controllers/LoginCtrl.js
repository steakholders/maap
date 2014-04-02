/*
* Name : LoginCtrl.js
* Module : Front-End::Controllers::LoginController
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
	.controller('LoginCtrl', [ "$scope", "$location", "ProfileService", "FlashMessage", "ErrorHandler", "Updater",
		function($scope, $location, ProfileService, FlashMessage, ErrorHandler, Updater) {
			
			$scope.userFormLogin = {
				email: "",
				password: ""
			};
			
			$scope.login = function() {
				if ($scope.userFormLogin) {
					var authUser = new ProfileService($scope.userFormLogin);
					authUser.$login({},
						function success(data) {
							Updater.setProfile(data);
							Updater.updateMenu();
							FlashMessage.future({ type: "success", title: "Login", message: "You have successfully logged in" });
							$location.path("/");
						}, 
						function err(error) {
							ErrorHandler.handle(error);
						}
					);
				}
			};
		}
	]);
