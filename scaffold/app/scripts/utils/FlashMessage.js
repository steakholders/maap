/*
* Name : FlashMessage.js
* Module : Front-End::Services
* Location : /scaffold/app/scripts/utils
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

angular.module("utils")
.provider('FlashMessage', function() {
	var future_flash_message = null;

	this.$get = ["$rootScope", function($rootScope) {
		var flush = function() {
			$rootScope.flash_message = future_flash_message;
			future_flash_message = null;
		};
		
		var prepare = function(message) {
			message.isArray = message.message instanceof Array;
			return message;
		};

		var future = function(message) {
			message = prepare(message);
			future_flash_message = message;
		};
		
		var set = function(message) {
			message = prepare(message);
			$rootScope.flash_message = message;
		};
		
		return {
			flush: flush,
			future: future,
			set: set
		};
	}];
});
