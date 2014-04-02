/*
* Name : Column.js
* Module : Back-end::Lib::Model::DSLModel
* Location : /lib/model/dslmodel/
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1         2014-03-01      Serena Girardi
* -------------------------------------------------
* Codifica modulo
* =================================================
*/

"use strict";

var AttributeReader = require("../../utils/AttributeReader");
var MaapError = require("../../utils/MaapError");

var identity = function(x) { return x; };

var Column = function(indexModel, params) {
	var self = this;
	this.indexModel = indexModel;

	// Valori di default
	this.selectable = false;
	this.sortable = false;
	this.transformation = identity;
	
	// Leggi i parametri obbligatori e opzionali
	AttributeReader.readRequiredAttributes(params, this, ["name"], function(param){
		throw new MaapError(15000, "Required parameter " + param + " in collection '" + self.indexModel.collectionModel.toString() + "', column '" + self.toString() + "'");
	});
	AttributeReader.readOptionalAttributes(params, this, ["label", "sortable", "transformation", "selectable"]);
	AttributeReader.assertEmptyAttributes(params, function(param){
		throw new MaapError(15000, "Unexpected parameter " + param + " in collection '" + self.indexModel.collectionModel.toString() + "', column '" + self.toString() + "'");
	});

	// Valori di default
	if (this.label === undefined) {
		this.label = this.name;
	}
	
	// Controllo dei tipi
	if (typeof this.label !== 'string' ||
		typeof this.name !== 'string' ||
		typeof this.transformation !== 'function' ||
		typeof this.selectable !== 'boolean' ||
		typeof this.sortable !== 'boolean'
	) {
		throw new MaapError(15000, "Parameter with a wrong type in collection '" + this.indexModel.collectionModel.toString() + "', column '" + this.toString() + "'");
	}
};

Column.prototype.getLabel = function() {
	return this.label;
};

Column.prototype.getName = function() {
	return this.name;
};

Column.prototype.getTransformation = function() {
	return this.transformation;
};

Column.prototype.isSelectable = function() {
	return this.selectable;
};

Column.prototype.isSortable = function() {
	return this.sortable;
};

Column.prototype.toString = function() {
	return this.getName();
};

Column.prototype.setSelectable = function(selectable) {
	this.selectable = selectable;
};

module.exports = Column;