/*
* Name : DocumentSchema.js
* Module : Back-end::Lib::Model::DSLModel
* Location : /lib/model/dslmodel/
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1           2014-03-01     Enrico Rotundo
* -------------------------------------------------
* Codifica modulo
* =================================================
*/

'use strict';

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var MaapError = require("../../utils/MaapError");

var DocumentSchema = new Schema({}, {strict: false});

/* A partire dalla 1 */
DocumentSchema.statics.findAllPaginatedQuery = function(query, perpage, page, errback) {
	if (page < 1) {
		page = 1;
	}

	return this.find(query).limit(perpage).skip(perpage*(page-1));
};

DocumentSchema.statics.findByIdAndPopulate = function(documentId, populate, callback, errback) {
	var query = this.findById(documentId);
	if (populate) {
		if (populate instanceof Array) {
			for (var i=0; i<populate.length; i++) {
				query.populate(populate[i]);
			}
		}
		else {
			query.populate(populate);
		}
	}
	query.exec(function(err, result) {
		if (err) {
			errback(err);
		} else {
			if (result) {
				callback(result);
			} else {
				errback(new MaapError(12000));
			}
		}	
	});
};

DocumentSchema.statics.safeFindById = function(documentId, callback, errback) {
	var query = this.findById(documentId);
	query.exec(function(err, result) {
		if (err) {
			errback(err);
		} else {
			if (result) {
				callback(result);
			} else {
				errback(new MaapError(12000));
			}
		}	
	});
};

DocumentSchema.statics.safeFindByIdAndRemove = function(documentId, callback, errback) {
	this.safeFindById(documentId,
		function success(result) {
			result.remove(function(err, result) {
				if (err) {
					errback(err);
				} else {
					callback(result);
				}
			});
		},
		errback
	);
};

DocumentSchema.methods.upsert = function(data, callback, errback) {
	// elimino il suo campo id altrimenti mongo restituisce un messaggio "Mod on _id not allowed"
	delete data._id;

	this.update(data, {upser: true}, function(err, num, result) {
		if (err) {
			errback(err);
		}
		else {
			// se la funzione di update ha successo ritorno il document modificato
			callback(result);
		}
	});
};

module.exports = DocumentSchema;