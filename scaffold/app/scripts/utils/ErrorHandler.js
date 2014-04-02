/*
* Name : ErrorHandler.js
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
.factory('ErrorHandler', ["$rootScope", "$location", "FlashMessage", "Updater",
	function ($rootScope, $location, FlashMessage, Updater) {
		var isLoginRequired = function(error) {
			if (error.data.code === 1001) {
				return true;
			} else {
				return false;
			}
		};
		
		var isLogoutRequired = function(error) {
			if (error.data.code === 1002) {
				return true;
			} else {
				return false;
			}
		};
		
		var isDslError = function(error) {
			if (error.data.code === 17000) {
				return true;
			} else {
				return false;
			}
		};
		
		var handle = function(error) {
			var message = { type: "danger" };

			if (error.status === 0) {
				// È stata interrotta la connessione
				message.title = "Connection refused";
				message.message = "Please check your Internet connection";
			} else {
				if (error.data.title !== undefined) {
					// È arrivato un errore da MaaP
					message.title = error.data.title;
					message.message = error.data.message;
					message.details = error.data.details;
				} else {
					// È arrivato un errore inatteso
					console.log("ErrorHandler received an unexpected error:", error);
					message.title = "Error "+error.code;
					message.message = error.data;
				}
			}

			if (isLoginRequired(error)) {
				FlashMessage.future(message);
				Updater.setProfile();
				$location.path("/login");
				return;
			}

			if (isLogoutRequired(error)) {
				FlashMessage.future(message);
				Updater.updateProfile();
				$location.path("/");
				return;
			}

			FlashMessage.set(message);
		};
		
		return {
			isLoginRequired: isLoginRequired,
			isDslError: isDslError,
			handle: handle
		};
	}
]);
