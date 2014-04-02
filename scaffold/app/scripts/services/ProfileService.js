/*
* Name : ProfileService.js
* Module : Front-End::Services::ProfileService
* Location : /scaffold/app/scripts/services
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

angular.module("services")
	.factory('ProfileService', ["$resource",
		function($resource) {
			return $resource('/profile', {}, {
				'get':    {method:'GET' },
				'update': {method:'PUT'},
				'login':  {method:'POST'},
				'logout': {method:'DELETE'}
			});
		}
	]);