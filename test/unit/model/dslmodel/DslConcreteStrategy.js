/*
* Name : DslConcreteStrategy.js
* Module : UnitTest
* Location : /test/unit/model/dslmodel
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1          2014-03-01     Federico Poli
* -------------------------------------------------
* Codifica test del modulo
* =================================================
*/


'use strict';

var DslConcreteStrategy = require('../../../../lib/model/dslmodel/DslConcreteStrategy.js');
var assert = require('assert');

describe('DslConcreteStrategy TU-25', function() {
	var strategy = null;
	var domain = {
		db: {
			model: function () {
				return null;
			}
		}
	};

	it('Viene costruito', function(done) {
		strategy = new DslConcreteStrategy();
		done();
	});

	it('Non è nullo', function(done) {
		assert.notEqual(strategy, null);
		done();
	});

	it('Ha un metodo init', function(done) {
		assert.notEqual(strategy.init, null);
		done();
	});

	it('Ha un metodo loadDSLFile', function(done) {
		assert.notEqual(strategy.loadDSLFile, null);
		done();
	});

	describe("init() TU-26", function () {

		it('Viene inizializzato', function(done) {
			strategy.init(function(){
				done();
			}, function(err){
				done(err.toError());
			});
		});
	});
	
	describe('Con un DSL semplice TU-27', function() {
		var testdsl = "collection(name:'BBB') {};";
		var collections = null;
		var coll = null;

		it('Lo carica', function(done) {
			strategy.loadDSLFile(testdsl, domain, function(coll){
				collections = coll;
				done();
			}, function(err){
				done(err.toError());
			});
		});

		it('Carica esattamente un CollectionModel', function(done) {
			assert.equal(collections.length, 1);
			coll = collections[0];
			done();
		});

		describe('Il CollectionModel caricato', function() {
			it('Ha il nome giusto', function(done) {
				assert.equal(coll.getName(), "BBB");
				done();
			});
		});
	});

	describe('Con un DSL complesso TU-27', function() {
		var testdsl = [
			"collection(name:'BBB') {",
			"	index {",
			"		column(label:'nome-attributo', name:'nome_attributo');",
			"		column(label:'attributo2', name:'nome_attributo');",
			"	};",
			"	show {",
			"		row(label:'etichetta_riga', name:'nome_attributo');",
			"	};",
			"};"
		].join("\n");
		var collections = null;
		var coll = null;
		
		it('Lo carica', function(done) {
			strategy.loadDSLFile(testdsl, domain, function(coll){
				collections = coll;
				done();
			}, function(err){
				done(err.toError());
			});
		});

		it('Carica esattamente un CollectionModel', function(done) {
			assert.equal(collections.length, 1);
			coll = collections[0];
			done();
		});

		describe('Il CollectionModel caricato', function() {
			it('Ha il nome giusto', function(done) {
				assert.equal(coll.getName(), "BBB");
				done();
			});
		});
	});

	describe('Con un DSL errato TU-27', function() {
		var testdsl = "ambarabàciccìcoccò";
		
		it('Segnala un errore non nullo', function(done) {
			strategy.loadDSLFile(testdsl, domain, function(coll){
				done(new Error("There should be an error"));
			}, function(err) {
				assert.notEqual(err, null);
				done();
			});
		});
	});
});
