/*
* Name : ObjectUtils.js
* Module : Back-end::Lib::Model::DSLModel
* Location : /lib/model/dslmodel/
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1          2014-02-28     Giacomo Fornari
* -------------------------------------------------
* Codifica modulo
* =================================================
*/

"use strict";

var getAttributes = function(document) {
	var result = [];

	for (var attr in document) {
		if (document.hasOwnProperty(attr)) {
			result.push(attr);
		}
	}

	return result;
};

var getByDotPath = function(document, dotpath) {
	var path = dotpath.split(".");
	var current = document;

	for (var i=0; i<path.length; i++) {
		var attr = path[i];

		if (current) {
			current = current[attr];
		}
	}

	return current;
};

exports.getAttributes = getAttributes;
exports.getByDotPath = getByDotPath;