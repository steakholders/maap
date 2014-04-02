/*
* Name : index.js
* Module : Back-end::Lib::Controller::Controller::ControllerFactory
* Location : /lib/controller/controller
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1           2014-03-03    Giacomo Fornari
* -------------------------------------------------
* Codifica modulo.
* =================================================
*/

'use strict';

exports.getCollectionService = function(app)  {
	return require("./CollectionService");
};

exports.getProfileService = function(app) {
	return require("./ProfileService");
};

exports.getAuthService = function(app) {
	return require("./AuthService");
};

exports.getForgotService = function(app) {
	return require("./ForgotService");
};

exports.getUserService = function(app) {
	return require("./UserService");
};

exports.getShowService = function(app) {
	return require("./ShowService");
};

exports.getIndexService = function(app) {
	return require("./IndexService");
};

exports.getActionService = function(app) {
	return require("./ActionService");
};
