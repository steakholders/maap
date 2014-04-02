/*
* Name : DslDomain.js
* Module : Back-end::Lib::Model::DSLModel
* Location : /lib/model/dslmodel/
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1          2014-03-01     Federico Poli
* -------------------------------------------------
* Codifica modulo
* =================================================
*/

"use strict";

var DslConcreteStrategy = require("./DslConcreteStrategy");
var MaapError = require("../../utils/MaapError.js");
var fs = require("fs");

var DslDomain = function(db) {
	this.db = db;
	this.modelRegistry = {};
	this.errors = [];
	this.strategy = new DslConcreteStrategy();
};

DslDomain.prototype.init = function(callback, errback) {
	this.strategy.init(callback, errback);
};

DslDomain.prototype.loadDSLFile = function(path, callback) {
	var self = this;
	fs.readFile(path, "utf-8", function(err, data) {
		if (err) {
			self.registerError(new MaapError(err));
			callback(err);
			return;
		}
		
		self.strategy.loadDSLFile(data, self,
			function(collections) {
				collections.forEach(function(model) {
					self.registerCollection(model);
				});
				callback(null, collections);
			},
			function(maaperror) {
				self.registerError(maaperror);
				callback(maaperror);
			}
		);
	});
};

DslDomain.prototype.registerError = function(error) {
	console.log(error);
	this.errors.push(error);
};

DslDomain.prototype.registerCollection = function(model) {
	var id = model.getId();

	if (this.modelRegistry[id] !== undefined) {
		this.registerError(new MaapError(3001, "The collection '"+model.getName()+"' with id '"+id+"' is defined multiple times"));
	}
	
	this.modelRegistry[id] = model;
	model.indexModel.noMoreColumns();
	model.showModel.noMoreRows();
};

DslDomain.prototype.getCollectionModel = function(collectionId) {
	return this.modelRegistry[collectionId];
};

var compareCollectionWeight = function(a, b) {
	var aw = a.getWeight();
	var bw = b.getWeight();
	if (aw < bw) {
		return -1;
	}
	if (aw > bw) {
		return 1;
	}
	return 0;
};

DslDomain.prototype.getCollectionModels = function() {
	var models = [];

	for (var id in this.modelRegistry) {
		if (this.modelRegistry.hasOwnProperty(id)) {
			models.push(this.modelRegistry[id]);
		}
	}
	models.sort(compareCollectionWeight);
	
	return models;
};

DslDomain.prototype.getErrors = function() {
	return this.errors;
};

module.exports = DslDomain;
