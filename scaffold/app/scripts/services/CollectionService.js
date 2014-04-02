/*
* Name : CollectionService.js
* Module : Front-End::Services::CollectionService
* Location : /scaffold/app/scripts/services
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1           2014-02-28     Gianluca Donato
* -------------------------------------------------
* Codifica Modulo.
* =================================================
*/

"use strict";

angular.module("services")
.factory('CollectionService', ["$resource",
	function($resource) {
		return $resource('/collections/:collectionId?page=:page&sort=:sort&order=:order', 
			{
				collectionId: "@collectionId", 
				page: '@page',
				sort: "@sort", 
				order: "@order"
			}, 
			{
				'query': {method:'GET', isArray: false }
			}
		);
	}
]);
