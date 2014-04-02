/*
* Name : ShowService.js
* Module : Back-end::Lib::Controller::Service::ShowService
* Location : /lib/controller/controller/
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1           2014-03-02     Gianluca Donato
* -------------------------------------------------
* Codifica modulo
* =================================================
* 0.0.2           2014-03-27     Luca De Franceschi
* -------------------------------------------------
* Aggiornato metodo editDocument
* =================================================
*/

'use strict';

var MaapError = require("../../utils/MaapError");

exports.getShowPage = function(req, res, next) {
	var domain = req.app.dslDomain;
	var collection = domain.getCollectionModel(req.params.collectionId);
	
	if (!collection) {
		next(new MaapError(18000));
		return;
	}

	var showModel = collection.getShowModel();
	showModel.getData(
		req.params.documentId,
		function(data) {
			res.json(data);
		},
		function(error) {
			next(error);
		}
	);
};

exports.deleteDocument = function(req, res, next) {
	var domain = req.app.dslDomain;
	var collection = domain.getCollectionModel(req.params.collectionId);

	if (!collection) {
		next(new MaapError(18000));
		return;
	}

	var showModel = collection.getShowModel();
	showModel.deleteDocument(
		req.params.documentId,
		function() {
			res.end();
		},
		function(error) {
			next(error);
		}
	);
};

exports.editDocument = function(req, res, next) {
	var domain = req.app.dslDomain;
	var collection = domain.getCollectionModel(req.params.collectionId);

	if (!collection) {
		next(new MaapError(18000));
		return;
	}

	var showModel = collection.getShowModel();
	showModel.updateDocument(req.params.documentId,
		req.body,
		function(data) {
			res.json(data.toObject);
		},
		function(error) {
			next(error);
		}
	);
};
