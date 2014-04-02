/*
* Name : UserCreateCtrl.js
* Module : Front-End::Controllers::UserCreateController
* Location : /scaffold/app/scripts/controllers
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1           2014-03-20     Gianluca Donato
* -------------------------------------------------
* Codifica Modulo.
* =================================================
*/

"use strict";

angular.module('controllers')
	.controller('UserCreateCtrl', [ "$scope", "$route", "UserListService", "FlashMessage", "ErrorHandler",
		function ($scope, $route, UserListService, FlashMessage, ErrorHandler) {
			
			$scope.userFormData = {
				email: "",
				password: "",
				level: ""
			};

			$scope.createUser = function() {
				if ($scope.userFormData) {
					if ($scope.userFormData.email.length <= 0) {
						FlashMessage.set({type: "danger", title: "Email required", message: "You must specify a valid email."});
						return;
					}
					if ($scope.userFormData.password.length <= 0) {
						FlashMessage.set({type: "danger", title: "Password required", message: "You must specify a valid password."});
						return;
					}
					if ($scope.userFormData.level.length <= 0) {
						FlashMessage.set({type: "danger", title: "User level required", message: "You must specify a valid user level."});
						return;
					}

					var newUser = new UserListService($scope.userFormData);
					newUser.$save({},
						function success() {
							FlashMessage.future({type: "success", title: "Success", message: "User " + $scope.userFormData.email + " successfully created!"});
							$route.reload();
						},
						function err(error) {
							ErrorHandler.handle(error);
						}
					);
				}
			};
		}
	]);
