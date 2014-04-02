/*
* Name : Router.js
* Module : Module : Back-end::Lib::Controller::Middleware::Routes
* Location : /lib/controller/middleware
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1          2014-03-01     Federico Poli
* -------------------------------------------------
* Codifica modulo.
* =================================================
* 0.0.2          2014-03-20     Serena Girardi
* -------------------------------------------------
* Aggiunto controllo allowSingnup.
* =================================================
*/
'use strict';

var serviceFactory = require("../service");
var auth = require("./Authentication");

exports.init = function(app)  {

	app.post('/profile', auth.requireNotLogged, auth.authenticate, serviceFactory.getProfileService().login);  //LOGIN 
	app.delete('/profile', auth.requireLogged, serviceFactory.getProfileService().logout);  //LOGOUT
	app.get('/profile', auth.requireLogged, serviceFactory.getProfileService().getProfile ); 
	app.put('/profile', auth.requireLogged, serviceFactory.getProfileService().updatePassword );

	if (app.config.allowSignup) {
		app.post('/register',  auth.requireNotLogged, serviceFactory.getUserService().registerUser );
	} else {
		app.post('/register',  auth.requireNotLogged, serviceFactory.getUserService().disabledRegisterUser );
	}
		
	app.post('/password/forgot', auth.requireNotLogged, serviceFactory.getForgotService().passwordResetRequest);
	app.put('/password/forgot', auth.requireNotLogged, serviceFactory.getForgotService().passwordReset);

	app.get('/users', auth.requireAdmin, serviceFactory.getUserService().usersList );
	app.post('/users', auth.requireAdmin, serviceFactory.getUserService().insertUser ); 

	app.get('/users/:id', auth.requireAdmin, serviceFactory.getUserService().userIdShowPage);
	app.put('/users/:id', auth.requireAdmin, serviceFactory.getUserService().updateLevel);
	app.delete('/users/:id',  auth.requireAdmin, serviceFactory.getUserService().deleteUser);

	app.get("/collections", auth.requireLogged, serviceFactory.getCollectionService().list);

	app.get("/collections/:collectionId", auth.requireLogged, serviceFactory.getIndexService().getIndexPage);

	app.get("/collections/:collectionId/:documentId", auth.requireLogged,  serviceFactory.getShowService().getShowPage);
	app.delete("/collections/:collectionId/:documentId", auth.requireAdmin, serviceFactory.getShowService().deleteDocument);
	app.put("/collections/:collectionId/:documentId", auth.requireAdmin, serviceFactory.getShowService().editDocument);
	app.use(app.router);
};

//exports.handler(req,res,next) = function() {} 