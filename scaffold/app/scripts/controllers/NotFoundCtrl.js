/*
* Name : NotFoundCtrl.js
* Module : Front-End::Controllers::NotFoundController
* Location : /scaffold/app/scripts/controllers
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1           2014-03-04     Enrico Rotundo
* -------------------------------------------------
* Codifica Modulo.
* =================================================
*/

"use strict";

angular.module("controllers")
	.controller('NotFoundCtrl', ["$scope", "$location",
		function ($scope, $location) {
			$scope.page = $location.path();
		}
	]);