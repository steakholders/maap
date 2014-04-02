/*
* Name : app.js
* Location : /scaffold/app/scripts/
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1           2014-03-01     Gianluca Donato
* -------------------------------------------------
* Codifica Modulo.
* =================================================
*/

"use strict";

angular.module("config", [] );
angular.module("services", [ "ngResource", "config" ] );
angular.module("controllers", [ "services", "utils", "config" ] );
angular.module("utils", [ "services", "config" ] );

angular.module("maap", ["ngRoute", "controllers", "utils", "config"])
	.config(["$routeProvider",
		function ($routeProvider) {
			$routeProvider
			.when('/', {
				templateUrl: 'views/home.html'
			})
			.when('/dashboard', {
				templateUrl: 'views/dashboard.html',
				controller: 'DashboardCtrl'
			})
			.when('/collections/:collectionId', {
				templateUrl: 'views/collection.html',
				controller: 'CollectionCtrl',
				reloadOnSearch: false
			})
			.when('/collections/:collectionId/:documentId', {
				templateUrl: 'views/document.html',
				controller: 'DocumentCtrl'
			})
			.when('/collections/:collectionId/:documentId/edit', {
				templateUrl: 'views/document-edit.html',
				controller: 'DocumentCtrl'
			})
			.when('/signup', {
				templateUrl: 'views/register.html',
				controller: 'RegisterCtrl'
			})
			.when('/login', {
				templateUrl: 'views/login.html',
				controller: 'LoginCtrl'
			})
			.when('/logout', {
				templateUrl: 'views/logout.html',
				controller: 'LogoutCtrl'
			})
			.when('/forgot_password', {
				templateUrl: 'views/forgot-password.html',
				controller: 'ForgotRequestCtrl'
			})
			.when('/reset_password', {
				templateUrl: 'views/reset-password.html',
				controller: 'ForgotResetCtrl'
			})
			.when('/users', {
				templateUrl: 'views/user-list.html',
				controller: 'UserListCtrl',
				reloadOnSearch: false
			})
			.when('/users/:id', {
				templateUrl: 'views/user-details.html',
				controller: 'UserDetailsCtrl'
			})
			.when('/users/:id/edit', {
				templateUrl: 'views/user-edit.html',
				controller: 'UserDetailsCtrl'
			})
			.when('/create_user', {
				templateUrl: 'views/user-create.html',
				controller: 'UserCreateCtrl'
			})
			.when('/profile', {
				templateUrl: 'views/profile.html',
				controller: 'ProfileCtrl'
			})
			.when('/profile/edit', {
				templateUrl: 'views/profile-edit.html',
				controller: 'ProfileEditCtrl'
			})
			.when('/report', {
				templateUrl: 'views/report.html'
			})
			.when('/help', {
				templateUrl: 'views/help.html',
				controller: 'HelpCtrl'
			})
			.when('/help/manual_user', {
				templateUrl: 'views/manual-user.html',
				controller: 'HelpCtrl'
			})
			.when('/help/manual_admin', {
				templateUrl: 'views/manual-admin.html',
				controller: 'HelpCtrl'
			})
			.otherwise({
				templateUrl: 'views/notfound.html',
				controller: 'NotFoundCtrl'
			});
		}

	]);
