/*
* Name : DslCollectionModel.js
* Module : Back-end::Lib::Model::DSLModel
* Location : /lib/model/dslmodel/
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1           2014-03-01     Giacomo Fornari
* -------------------------------------------------
* Codifica modulo
* =================================================
* 0.0.2           2014-03-01     Luca De Franceschi
* -------------------------------------------------
* Incremento metodi
* =================================================
*/

"use strict";

var AttributeReader = require("../../utils/AttributeReader");
var DocumentSchema = require("./DocumentSchema");
var ShowModel = require("./ShowModel");
var IndexModel = require("./IndexModel");
var MaapError = require("../../utils/MaapError");


var DslCollectionModel = function(dslDomain, params) {
	var self = this;
	this.dslDomain = dslDomain;
	
	// Valori di default
	this.weight = 0;

	this.showModel = new ShowModel(this, {});
	this.indexModel = new IndexModel(this, {});
		
	// Leggi i parametri obbligatori e opzionali
	AttributeReader.readRequiredAttributes(params, this, ["name"], function(param){
		throw new MaapError(8000, "Required parameter '" + param + "' in collection '" + self.toString() + "'");
	});

	AttributeReader.readOptionalAttributes(params, this, ["id", "label", "weight"]);

	AttributeReader.assertEmptyAttributes(params, function(param){
		throw new MaapError(8000, "Unexpected parameter '" + param + "' in collection '" + self.toString() + "'");
	});
	
	// Valori di default
	if (this.id === undefined) {
		this.id = this.name;
	}
	if (this.label === undefined) {
		var label = this.name.toLowerCase();
		this.label = label.substring(0,1).toUpperCase() + label.substring(1);
	}
	if (this.weight === undefined) {
		this.weight = 0;
	}

	// Verifiche
	if (!this.id.match( /^[a-z0-9-]+$/i )) {
		throw new MaapError(8001, "The collection id '"+this.id+"' must contain only alphabetic characters, digits and minus. It can not be empty");
	}
	
	this.docModel = this.dslDomain.db.model(this.name, DocumentSchema);
};

DslCollectionModel.prototype.getId = function() {
	return this.id;
};

DslCollectionModel.prototype.getName = function() {
	return this.name;
};

DslCollectionModel.prototype.getLabel = function() {
	return this.label;
};

DslCollectionModel.prototype.getWeight = function() {
	return this.weight;
};

DslCollectionModel.prototype.getIndexModel = function() {
	return this.indexModel;
};

DslCollectionModel.prototype.getShowModel = function() {
	return this.showModel;
};

DslCollectionModel.prototype.setIndexModel = function(indexModel) {
	this.indexModel = indexModel;
};

DslCollectionModel.prototype.setShowModel = function(showModel) {
	this.showModel = showModel;
};

DslCollectionModel.prototype.toString = function() {
	return this.getName();
};

module.exports = DslCollectionModel;
