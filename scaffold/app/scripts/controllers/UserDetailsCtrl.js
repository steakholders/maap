/*
* Name : UserDetailsCtrl.js
* Module : Front-End::Controllers::UserDetailsController
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
.controller('UserDetailsCtrl', [ "$scope", "$routeParams", "$location", "UserService", "FlashMessage", "ErrorHandler",
	function ($scope, $routeParams, $location, UserService, FlashMessage, ErrorHandler) {
		UserService.get({
				id: $routeParams.id
			},
			function(user) {
				$scope.user = user;
				$scope.userLevelForm = $scope.user.level;

				if ($scope.user.level === "1") {
					$scope.user.role = "Base User";
					$scope.isAdmin = false;
					$scope.isSuperAdmin = false;
				}
				if ($scope.user.level === "2") {
					$scope.user.role = "Admin";
					$scope.isAdmin = true;
					$scope.isSuperAdmin = false;
				}
				if ($scope.user.level === "3") {
					$scope.user.role = "Super Admin";
					$scope.isAdmin = true;
					$scope.isSuperAdmin = true;
				}
			},
			function err(error) {
				ErrorHandler.handle(error);
			}
		);

		$scope.editUser = function() {
			$scope.user.level = $scope.userLevelForm;
			UserService.update({
					id: $routeParams.id
				},
				$scope.user,
				function success() {
					FlashMessage.future({ type: "success", title: "Success", message: "User Level has successfully updated!" });
					var userpath = "users/" + $scope.user._id;
					$location.path(userpath);
				},
				function err(error) {
					ErrorHandler.handle(error);
				} 
			);
		};

		$scope.deleteUser = function(user) {
			if(confirm("Delete user " + user.email + "?")){
				UserService.remove({
						id: user._id
					},
					function success() {
						FlashMessage.future({ type: "success", title: "Success", message: "User has successfully deleted!" });
						$location.path('/users');
					},
					function err(error) {
						ErrorHandler.handle(error);
					}
				);
			}
		};

	}
]);
