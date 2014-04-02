/*
* Name : AppInjector.js
* Module : Back-end::Lib::Controller::Middleware::Authentication
* Location : /lib/controller/middleware
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

'use strict';

exports.init = function(app) {

	// Inserisce in ogni richiesta un riferimento all'applicazione.
	// L'applicazione app contiene riferimenti importanti come:
	// app.db.user, app.db.data, app.config, app.dsldomain
	// Visto che sono importanti, i controller che hanno solo req devono
	// potervi accedere, e lo fanno tramite req.app
	var middleware = function(req, res, next) {
		req.app = app;
		next();
	};

	app.use(middleware);
};
