/*
* Name : HelpCtrl.js
* Module : Front-End::Controllers::HelpController
* Location : /scaffold/app/scripts/controllers
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1           2014-03-01     Serena Girardi
* -------------------------------------------------
* Codifica Modulo.
* =================================================
*/

"use strict";

angular.module('controllers')
	.controller('HelpCtrl', ['$scope',
		function($scope) {
			
			$scope.user_manual_version = "v3.0.0";
			$scope.admin_manual_version = "v3.0.0";
			
			$('#startride').click(function (e) {
				e.preventDefault();
				$(this).BootJoyride({
					'cookieMonster': false,               // true/false for whether cookies are used
					'cookieName': 'maapJoyride',          // choose your own cookie name
					'cookieDomain': false,                // set to false or yoursite.com
					'tipContent': '#JoyrideID',           // The ID of the <ol> used for content
					'postRideCallback': $.noop,           // A method to call once the tour closes
					'postStepCallback': $.noop,           // A method to call after each step
					'nextOnClose': false,                 // If cookies are enabled, increment the current step on close
					'debug': false,
					'current_path': 'help/manual_user'    // MaaP ovverride for angular prefix(#) redirect bug
				});
			});
		}
	]);