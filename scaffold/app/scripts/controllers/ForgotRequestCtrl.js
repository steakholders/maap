/*
* Name : ForgotRequestCtrl.js
* Module : Front-End::Controllers::ForgotRequestController
* Location : /scaffold/app/scripts/controllers
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1           2014-03-02     Luca De Franceschi
* -------------------------------------------------
* Codifica Modulo.
* =================================================
*/

"use strict";

angular.module('controllers')
	.controller('ForgotRequestCtrl', ["$scope", "$routeParams", "ForgotPasswordService", "FlashMessage", "ErrorHandler",
		function($scope, $rootScope, ForgotPasswordService, FlashMessage, ErrorHandler) {
			
			$scope.requestEmail = "";
			
			$scope.request_password = function() {
				FlashMessage.set({ type: "info", title: "Sending...", message: "An email will be sent in a few seconds..." });
				if ($scope.requestEmail) {
					ForgotPasswordService.request({
							email: $scope.requestEmail
						},
						function success() {
							FlashMessage.set({ type: "success", title: "Success!", message: "The email has been sent." });
						},
						function err(error) {
							ErrorHandler.handle(error);
						} 
					);
				}
			};
		}
	]);