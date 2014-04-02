/*
* Name : Row.js
* Module : Back-end::Lib::Model::DSLModel
* Location : /lib/model/dslmodel/
*
* History :
*
* Version         Date           Programmer
* =================================================
* 0.0.1          2014-03-02     Enrico Rotundo
* -------------------------------------------------
* Codifica modulo
* =================================================
*/

"use strict";

var AttributeReader = require("../../utils/AttributeReader");
var MaapError = require("../../utils/MaapError");

var identity = function(x) { return x; };

var Row = function(showModel, params) {
	var self = this;
	this.showModel = showModel;
	
	// Valori di default
	this.transformation = identity;
	
	// Leggi i parametri obbligatori e opzionali
	AttributeReader.readRequiredAttributes(params, this, ["name"], function(param){
		throw new MaapError(16000, "Required parameter '" + param + "' in collection '" + self.showModel.collectionModel.toString() + "', row '" + self.toString() + "'");
	});
	AttributeReader.readOptionalAttributes(params, this, ["label", "transformation"]);
	AttributeReader.assertEmptyAttributes(params, function(param){
		throw new MaapError(16000, "Unexpected parameter '" + param + "' in collection '" + self.showModel.collectionModel.toString() + "', row '" + self.toString() + "'");
	});

	// Valori di default
	if (this.label === undefined) {
		this.label = this.name;
	}
	
	// Controllo dei tipi
	if (typeof this.label !== 'string' ||
		typeof this.name !== 'string' ||
		typeof this.transformation !== 'function'
	) {
		throw new MaapError(16000, "Parameter with a wrong type in collection '" + this.showModel.collectionModel.toString() + "', row '" + this.toString() + "'");
	}
};

Row.prototype.getLabel = function() {
	return this.label;
};

Row.prototype.getName = function() {
	return this.name;
};

Row.prototype.getTransformation = function() {
	return this.transformation;
};

Row.prototype.toString = function() {
	return this.getName();
};

module.exports = Row;