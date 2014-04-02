/*
* Name : ForgotPasswordService.js
* Module : Front-End::Services::ForgotPasswordService
* Location : /scaffold/app/scripts/services
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1           2014-03-01     Federico Poli
* -------------------------------------------------
* Codifica Modulo.
* =================================================
*/

"use strict";

angular.module("services")
	.factory('ForgotPasswordService', ["$resource",
		function($resource) {
			return $resource('/password/forgot', {}, {
				'request': {method:'POST'},
				'reset': {method: 'PUT'}
			});
		}
]);