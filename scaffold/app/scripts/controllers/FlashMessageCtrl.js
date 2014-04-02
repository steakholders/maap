/*
* Name : FlashMessageCtrl.js
* Module : Front-End::Controllers
* Location : /scaffold/app/scripts/controllers
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

angular.module("controllers")
	.controller('FlashMessageCtrl', ["$scope", "ErrorHandler", "FlashMessage", "debug",
	function ($scope, ErrorHandler, FlashMessage, debug) {
		$scope.flushMessage = FlashMessage.flush;
		$scope.debug = debug;
	}
]);
