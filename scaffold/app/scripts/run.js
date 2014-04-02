/*
* Name : run.js
* Location : /scaffold/app/scripts/
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

angular.module("maap")
	.run(["$rootScope", "$location", "reportLink", "Updater", "ProfileService", "FlashMessage", "ErrorHandler",
		function ($rootScope, $location, reportLink, Updater, ProfileService, FlashMessage, ErrorHandler) {
			
			$rootScope.reportLink = reportLink;

			// I redirect necessari per un utente che è già loggato
			var redirectLogged = function() {
				if ($location.path() === "/") {
					$location.path("/dashboard");
				} else
				if ($location.path() === "/" ||
					$location.path() === "/login" ||
					$location.path() === "/signup" ||
					$location.path() === "/reset_password" ||
					$location.path() === "/forgot_password"
				) {
					FlashMessage.future({ type: "danger", title: "Access denied", message: "You must not be logged to view page "+$location.path() });
					$location.path("/dashboard");
				}
			};

			// I redirect necessari per un utente che non è loggato
			var redirectNotLogged = function() {
				if ($location.path() === "/") {
					$location.path("/login");
				} else
				if ($location.path() === "/" ||
					$location.path() === "/dashboard" ||
					$location.path() === "/profile" ||
					$location.path() === "/profile/edit"
				) {
					FlashMessage.future({ type: "danger", title: "Access denied", message: "You must be logged to view page "+$location.path() });
					$location.path("/login");
				}
			};
			
			// Prima di cambiare pagina, fai i redirect che servono in base allo stato dell'utente
			$rootScope.$on('$routeChangeStart', function() {
				if ($rootScope.isLogged) {
					redirectLogged();
				} else {
					redirectNotLogged();
				}
			});
			
			var firstRouteChangeSuccess = true;
			
			// Quando ha finito di cambiare pagina, 
			$rootScope.$on('$routeChangeSuccess', function() {
				// Fai il flush per visualizzare i nuovi messaggi e cancellare i vecchi
				FlashMessage.flush();

				/**
				 * Al primo caricamento del sito:
				 * - carica il profilo
				 * - visualizza gli errori DSL
				 * - fai i redirect che servono in base allo stato dell'utente
				 */
				if (firstRouteChangeSuccess) {
					firstRouteChangeSuccess = false;
					Updater.updateProfile(
						function success() {
							redirectLogged();
						},
						function error(err) {
							if (ErrorHandler.isDslError(err)) {
								ErrorHandler.handle(err);
							}
							redirectNotLogged();
						}
					);
					Updater.updateMenu();
				}
			});
		}
	]);
