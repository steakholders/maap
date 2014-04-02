/*
* Name : DocumenrService.js
* Module : Front-End::Services::DocumentService
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
.factory('DocumentService', ["$resource",
	function($resource) {
		return $resource('/collections/:collectionId/:documentId', {collectionId: "@collectionId", documentId: "@documentId"}, {
			'query': {method:'GET', isArray: true },
			'update': {method:'PUT'},
			'remove': {method:'DELETE'}
		});
	}
]);
