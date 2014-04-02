/*
* Name : UserService.js
* Module : Front-End::Services::UserService
* Location : /scaffold/app/scripts/services
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

angular.module("services")
	.factory('UserService', ["$resource",
		function($resource) {
			return $resource('/users/:id', {id: "@id"}, {
				'get': {method:'GET'},
				'update': {method:'PUT'}, 
				'remove': {method:'DELETE'}
			});
		}
]);