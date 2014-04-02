/*
* Name : CollectionListService.js
* Module : Front-End::Services::CollectionListService
* Location : /scaffold/app/scripts/services
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1           2014-02-28     Federico Poli
* -------------------------------------------------
* Codifica Modulo.
* =================================================
*/

"use strict";

angular.module("services")
.factory('CollectionListService', ["$resource",
	function($resource) {
		return $resource('/collections', {}, {
			'query': {method:'GET', isArray: true },
		});
	}
]);
