/*
* Name : AttributeReader.js
* Module : Back-end::Lib::Utils::AttributeReader
* Location : /lib/utils
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1          2014-02-26     Serena Girardi
* -------------------------------------------------
* Codifica modulo.
* =================================================
*/

"use strict";

var readRequiredAttributes = function(source, target, required, errback) {
	for (var i=0; i<required.length; i++) {
		var attr = required[i];

		if (source[attr] !== undefined) {
			target[attr] = source[attr];
			delete source[attr];
			continue;
		}
		
		// Attributo attr mancante
		return errback(attr);
	}
};

var readOptionalAttributes = function(source, target, optional) {
	for (var i=0; i<optional.length; i++) {
		var attr = optional[i];

		if (source[attr] !== undefined) {
			target[attr] = source[attr];
			delete source[attr];
			continue;
		}
	}
};

var assertEmptyAttributes = function(source, errback) {
	for (var key in source) {
		if (source.hasOwnProperty(key)) {
			
			return errback(key);

		}
	}
};

exports.readRequiredAttributes = readRequiredAttributes;
exports.readOptionalAttributes = readOptionalAttributes;
exports.assertEmptyAttributes = assertEmptyAttributes;