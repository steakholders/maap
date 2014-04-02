/*
* Name : ObjectUtils.js
* Module : UnitTest
* Location : /test/unit/model/dslmodel
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1          2014-02-28     Luca De Franceshi
* -------------------------------------------------
* Codifica test.
* =================================================
*/

"use strict";

var ObjectUtils = require("../../../../lib/model/dslmodel/ObjectUtils.js");
var assert = require('assert');

describe("ObjectUtils", function() {
	describe("getByDotPath", function() {
		var obj = {a: { b: { c: "abc"}, d: null, e: {} }, f: "casa", g: [ "casa1", "casa2", "casa3"]};
		
		it("obj.a", function(done){
			var res = ObjectUtils.getByDotPath(obj, "a");
			assert.deepEqual(res, obj.a);
			done();
		});

		it("obj.a.b", function(done){
			var res = ObjectUtils.getByDotPath(obj, "a.b");
			assert.deepEqual(res, obj.a.b);
			done();
		});

		it("obj.a.b.c", function(done){
			var res = ObjectUtils.getByDotPath(obj, "a.b.c");
			assert.deepEqual(res, obj.a.b.c);
			done();
		});

		it("obj.a.b.d", function(done){
			var res = ObjectUtils.getByDotPath(obj, "a.b.d");
			assert.deepEqual(res, obj.a.b.d);
			done();
		});

		it("obj.a.b.e", function(done){
			var res = ObjectUtils.getByDotPath(obj, "a.b.e");
			assert.deepEqual(res, obj.a.b.e);
			done();
		});

		it("obj.f", function(done){
			var res = ObjectUtils.getByDotPath(obj, "f");
			assert.deepEqual(res, obj.f);
			done();
		});

		it("obj.a.b.g", function(done){
			var res = ObjectUtils.getByDotPath(obj, "g");
			assert.deepEqual(res, obj.g);
			done();
		});

		it("obj.a.b.g.1", function(done){
			var res = ObjectUtils.getByDotPath(obj, "g.1");
			assert.deepEqual(res, obj.g[1]);
			done();
		});

		it("obj.a.b.g.10", function(done){
			var res = ObjectUtils.getByDotPath(obj, "g.10");
			assert.deepEqual(res, obj.g[10]);
			done();
		});

		it("obj.xyz", function(done){
			var res = ObjectUtils.getByDotPath(obj, "xyz");
			assert.deepEqual(res, obj.xyz);
			done();
		});
	});
});
