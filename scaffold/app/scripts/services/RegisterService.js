/*
* Name : RegisterService.js
* Module : Front-End::Services::RegisterService
* Location : /scaffold/app/scripts/services
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.0           2014-03-19     Enrico Rotundo
* -------------------------------------------------
* Codifica Modulo.
* =================================================
*/

"use strict";

angular.module("services")
	.factory('RegisterService', ["$resource",
		function($resource) {
			return $resource('/register', {}, {
				'signup': {method:'POST'}
			});
		}
]);