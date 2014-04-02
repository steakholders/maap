/*
* Name : RegisterCtrl.js
* Module : Front-End::Controllers::RegisterController
* Location : /scaffold/app/scripts/controllers
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1           2014-03-19     Gianluca Donato
* -------------------------------------------------
* Codifica Modulo.
* =================================================
*/

"use strict";

angular.module("controllers")
	.controller('RegisterCtrl', ["$scope", "$location", "RegisterService", "FlashMessage", "ErrorHandler",
		function ($scope, $location, RegisterService, FlashMessage, ErrorHandler) {

			$scope.email = "";
			$scope.password = "";
			$scope.confirmPassword = "";

			$scope.signup = function() {
				if ($scope.password === $scope.confirmPassword) {
					var newUser = new RegisterService({
						email: $scope.email,
						password: $scope.password
					});
					newUser.$signup( 
						function success() {
							FlashMessage.future({ type: "success", title: "Sign up", message: "You have successfully signed up" });
							$location.path("/login");
						},
						function err(error) {
							ErrorHandler.handle(error);
						}
					);
				} else {
					FlashMessage.set({ type: "danger", title: "Error", message: "Password and password confirmation must match." });
				}
			};
		}
	]);
