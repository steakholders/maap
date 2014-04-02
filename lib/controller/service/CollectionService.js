/*
* Name : CollectionService.js
* Module : Back-end::Lib::Controller::Service::CollectionService
* Location : /lib/controller/controller
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1           2014-03-04     Federico Poli
* -------------------------------------------------
* Codifica modulo.
* =================================================
*/

'use strict';

// Restituisce la lista delle collection per la dashboard
exports.list = function(req, res, next) {
	var models = req.app.dslDomain.getCollectionModels();
	var collections = [];
	for (var i=0; i<models.length; i++) {
		collections.push({
			id: models[i].getId(),
			name: models[i].getName(),
			label: models[i].getLabel()
		});
	}
	res.json(collections);
};
