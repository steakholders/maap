/*
* Name : UserListService.js
* Module : Front-End::Services::UserListService
* Location : /scaffold/app/scripts/services
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1           2014-03-20     Giacomo Fornari
* -------------------------------------------------
* Codifica Modulo.
* =================================================
*/

"use strict";

angular.module("services")
.factory('UserListService', ["$resource",
	function($resource) {
		return $resource('/users/', {}, {
			'query':  {method:'GET', isArray: false},
			'save': {method:'POST'}
		});
	}
]);
