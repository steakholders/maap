/*
* Name : IndexService.js
* Module : Back-end::Lib::Controller::Service::IndexService
* Location : /lib/controller/controller
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1           2014-03-02    Enrico Rotundo
* -------------------------------------------------
* Codifica modulo
* =================================================
*/

'use strict';

var MaapError = require("../../utils/MaapError");

exports.getIndexPage = function(req, res, next) {
	var domain = req.app.dslDomain;
	var collection = domain.getCollectionModel(req.params.collectionId);
	
	if (collection) {
		var indexModel = collection.getIndexModel();
		indexModel.getData(
			req.query.page,
			req.query.sort,
			req.query.order,
			function(data) {
				res.json(data);
			},
			function(err) {
				next(err);
			}
		);
	} else {
		next(new MaapError(7000));
	}
};
