/*
* Name : config.js
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

angular.module('config')
	// Show details in error messages?
	.constant('debug', false)
	// How many collections in the navbar?
	.constant('navBarCollections', 4)
	// Show signup button? Remember to disable signup also in the backend configuration file!
	.constant('showSignup', true)
	// Link used in the "Report a Problem" button
	.constant('reportLink', "https://github.com/steakholders/maap/issues/new");
