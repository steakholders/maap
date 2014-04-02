/*
* Name : UserListCtrl.js
* Module : Front-End::Controllers::UserListController
* Location : /scaffold/app/scripts/controllers
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1           2014-03-05     Gianluca Donato
* -------------------------------------------------
* Codifica Modulo.
* =================================================
*/

"use strict";

angular.module('controllers')
	.controller('UserListCtrl', [ "$scope", "$route", "$routeParams", "$location", "UserListService", "UserService", "FlashMessage", "ErrorHandler",
		function ($scope, $route, $routeParams, $location, UserListService, UserService, FlashMessage, ErrorHandler) {

			$scope.page = $routeParams.page || 1;
			/*$scope.sort = $routeParams.sort || "";
			$scope.ascending = ($routeParams.order !== "desc");*/
			
			$scope.userslist = {
				numusers: 0,
				perpage: 1,
				users: []
			};

			var getData = function() {
				UserListService.query({
						page: $scope.page/*,
						sort: $scope.sort,
						order: $scope.ascending?"asc":"desc"*/
					},
					function success(data){
						$scope.userslist = data;
						paginate_users();
					},
					function err(error) {
						ErrorHandler.handle(error);
					}
				);
			};
		
			getData();

			var refresh = function() {
				// Refresh for search is disabled in app.js
				$location.search({
					page: $scope.page/*,
					sort: $scope.sort,
					order: $scope.ascending?"asc":"desc"*/
				});

				getData();
			};
			
			$scope.deleteUser = function(user) {
				if(confirm("Delete user " + user.email + "?")){
					UserService.remove({
							id: user._id
						},
						function success() {
							FlashMessage.set({ type: "success", title: "Success!", message: "User has been deleted." });
							refresh();
						},
						function err(error) {
							ErrorHandler.handle(error);
						}
					);
				}
			};
			
			var paginate_users = function () {
				var totPages = 1;
				var visPages = 10;
				var users_perpage = $scope.userslist.perpage;
				var users_tot = $scope.userslist.numusers;

				if (users_perpage !== 0) {
					totPages = Math.ceil(users_tot/users_perpage);
				}
				if (totPages < visPages ) {
					visPages = totPages;
				}
				$scope.hidePaginate = (totPages <= 1);

				$('#paginate-collection').twbsPagination({
					totalPages: totPages,
					visiblePages: visPages,
					startPage: $scope.page,
					onPageClick: function (event, page) {
						if (page !== $scope.page) {
							$scope.page = page;
							refresh();
						}
					}
				});
			};
		}
	]);
