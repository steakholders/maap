/*
* Name : DocumentService.js
* Module : Fornt-End::Services::DocumentService
* Location : /scaffold/test/unit/services
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1           2014-03-06    Nicolò Tresoldi
* -------------------------------------------------
* Codifica Modulo.
* =================================================
*/

/*global _:false */
'use strict';
 
describe('TU-85, TU-108, TU-109: DocumentService', function(){
	var DocumentService, $httpBackend;
   
	beforeEach(angular.mock.module('services'));

	beforeEach(inject(function (_DocumentService_, _$httpBackend_ ) {
		DocumentService = _DocumentService_;
		$httpBackend = _$httpBackend_;
		var documento = [{ id: '111', fielda: 'a', fieldb: 'b' }];
		$httpBackend.when('GET', '/collections/000/111').respond(documento);
		$httpBackend.when('PUT', '/collections/000/111').respond(update());
		$httpBackend.when('DELETE', '/collections/000/111').respond(remove());	
		function update(){
			documento = { id: '111', fielda: 'c', fieldb: 'd' };
			return documento;
		}
		function remove(){
			documento = {};
			return documento;
		}
	}));

	//Creo un matcher di jasmine personalizzato per la verifica del jason, utilizzo la libreria underscore
	beforeEach(function() {
		this.addMatchers({
			toDeepEqual: function(expected) {
				return _.isEqual(JSON.stringify(this.actual), JSON.stringify(expected));
			}
		});
	});

	//Verifico che sono stati invocati solamente i metodi aspettati	//
	afterEach(function () {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it("should make a call at /collection/:collectionId with an ID", function () {
		var documentId = '111';
		var collectionId = '000';
		$httpBackend.expect('GET','/collections/'+collectionId+'/'+documentId);
		var chiamata = DocumentService.query({ collectionId: collectionId, documentId: documentId });
		$httpBackend.flush();
		expect(chiamata).toBeDefined();
	});

	/*it("should return correct JSON of user with that ID", function () {
		var id = '532adea92c163256d59db0d8';
		$httpBackend.expect('GET','/users/'+id);
		var chiamata = DocumentService.get({ id: id });
		$httpBackend.flush();
		//Viene utilizzato il matcher custom
		expect(chiamata).toDeepEqual({ email: 'gian@gmail.com', level: 'a' });
	});*/

	it("should update the document with that ID", function () {
		var documentId = '111';
		var collectionId = '000';
		$httpBackend.expect('PUT','/collections/'+collectionId+'/'+documentId);
		var chiamata = DocumentService.update({ collectionId: collectionId, documentId: documentId });
		$httpBackend.flush();
		expect(chiamata).toBeDefined();
		//expect(chiamata).toDeepEqual({ email: 'admin@gmail.com', level: 'a' });
	});

	it("should delete the document with that ID", function () {
		var documentId = '111';
		var collectionId = '000';
		$httpBackend.expect('DELETE','/collections/'+collectionId+'/'+documentId);
		var chiamata = DocumentService.remove({ collectionId: collectionId, documentId: documentId });
		$httpBackend.flush();
		expect(chiamata).toBeDefined();
	});

});
