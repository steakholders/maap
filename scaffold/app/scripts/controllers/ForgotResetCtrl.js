/*
* Name : ForgotResetCtrl.js
* Module : Front-End::Controllers::ForgotResetController
* Location : /scaffold/app/scripts/controllers
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1          2014-03-02     Serena Girardi
* -------------------------------------------------
* Codifica Modulo.
* =================================================
*/

"use strict";

angular.module('controllers')
	.controller('ForgotResetCtrl', ["$scope", "$rootScope", "$routeParams", "$location", "ForgotPasswordService", "FlashMessage", "ErrorHandler",
		function($scope, $rootScope, $routeParams, $location, ForgotPasswordService, FlashMessage, ErrorHandler) {

			$scope.resetPassword = "";
			$scope.confirmResetPassword = "";

			$scope.reset_password = function() {
				if ($scope.resetPassword === $scope.confirmResetPassword) {
					ForgotPasswordService.reset({
							password: $scope.resetPassword,
							token: $routeParams.token
						},
						function success() {
							FlashMessage.future({ type: "success", title: "You have successfully reset your password!", message: "You can now login with your new password." });
							$location.path('/login');
						},
						function err(error) {
							ErrorHandler.handle(error);
						} 
					);
				} else {
					FlashMessage.set({type: "danger", title: "Error", message: "Password and password confirmation must match."});
				}
			};

		}
	]);