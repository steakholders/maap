/*
* Name : ProfileEditCtrl.js
* Module : Front-End::Controllers::ProfileEditController
* Location : /scaffold/app/scripts/controllers
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1           2014-03-06     Giacomo Fornari
* -------------------------------------------------
* Codifica Modulo.
* =================================================
*/

"use strict";

angular.module("controllers")
	.controller('ProfileEditCtrl', ["$scope", "$rootScope", "$location", "ProfileService", "FlashMessage", "ErrorHandler",
		function ($scope, $rootScope, $location, ProfileService, FlashMessage, ErrorHandler) {
			$scope.newPassword = "";
			$scope.confirmPassword = "";
			$scope.oldPassword = "";

			$scope.update_password = function() {
				if ($scope.newPassword === $scope.confirmPassword) {
					ProfileService.update({
							password: $scope.newPassword,
							oldpassword: $scope.oldPassword
						},
						function success() {
							FlashMessage.future({ type: "success", title: "Success!", message: "Password has been updated." });
							$location.path('/profile');
						},
						function err(error) {
							ErrorHandler.handle(error);
						} 
					);
				}
				else {
					FlashMessage.set({ type: "danger", title: "Error", message: "Password confirmation and New Password must match." });
				} 
			};

		}
	]);