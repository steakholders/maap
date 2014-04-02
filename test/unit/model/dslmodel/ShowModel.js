/*
* Name : ShowModel.js
* Module : UnitTest
* Location : /test/unit/
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1          2014-03-02     Giacomo Fornari
* -------------------------------------------------
* Codifica test
* =================================================
*/

"use strict";

var ShowModel = require("../../../../lib/model/dslmodel/ShowModel");
var assert = require('assert');

describe("ShowModel", function() {
	var show = null;
	var collection = {};

	it("Viene costruito", function(done) {
		show = new ShowModel(collection, {});
		done();
	});

	it("Non è nullo", function(done) {
		assert.notEqual(show, null);
		done();
	});

	/*it("TU - 41, getData()", function(done) {
		show.getData("53148b32aa253e7d1b2d58e2", function(result) {
			assert.notEqual(result, null);
			if (typeof result === 'object') {
				done();	
			}
			else {
				done(new Error("The result was not a json"));
			}
		},
		function(err) {
			done(err);
		});
	});*/
});