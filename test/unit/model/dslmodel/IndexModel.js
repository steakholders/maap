/*
* Name : IndexModel.js
* Module : UnitTest
* Location : /test/unit/model/dslmodel
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1          2014-03-05      Serena Girardi
* -------------------------------------------------
* Codifica test.
* =================================================
*/

"use strict";

var IndexModel = require("../../../../lib/model/dslmodel/IndexModel.js");
var assert = require('assert');

describe("IndexModel", function() {
	var index = null;
	var collection = {};

	it("Viene costruito", function(done) {
		index = new IndexModel(collection, {});
		done();
	});

	it("Non è nullo", function(done) {
		assert.notEqual(index, null);
		done();
	});
});