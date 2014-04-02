/*
* Name : DocumentCtrl.js
* Module : Front-End::Controllers::DocumentController
* Location : /scaffold/app/scripts/controllers
*
* History :
* 
* Version         Date           Programmer
* =================================================
* 0.0.1           2014-03-01     Gianluca Donato
* -------------------------------------------------
* Codifica Modulo.
* =================================================
*/

"use strict";

angular.module("controllers")
	.controller('DocumentCtrl', ["$scope", "$routeParams", "$location", "DocumentService", "FlashMessage","ErrorHandler",
		function ($scope, $routeParams, $location, DocumentService, FlashMessage, ErrorHandler) {
			$scope.collection = { id: $routeParams.collectionId };
			$scope.document = { id: $routeParams.documentId };
			
			DocumentService.query({
					collectionId: $scope.collection.id,
					documentId: $scope.document.id
				},
				function success(data) {
					$scope.document.fields = data;
				},
				function err(error){
					ErrorHandler.handle(error);
				}
			);
			
			$scope.delete_document = function () {
				if(confirm("Delete Document?")){
					DocumentService.remove({
							collectionId: $scope.collection.id,
							documentId: $scope.document.id
						},
						function success() {
							FlashMessage.future({ type: "success", title: "Success!", message: "Document has been deleted." });
							$location.path('/collections/'+$scope.collection.id);
						},
						function error(err) {
							ErrorHandler.handle(err);
						}
					);
				}
			};

			$scope.editDocumentData = {};

			$scope.edit_document = function() {
				DocumentService.update({
						collectionId: $scope.collection.id,
						documentId: $scope.document.id
					},
					$scope.editDocumentData,
					function success() {
						FlashMessage.future({ type: "success", title: "Success!", message: "Document has been updated." });
						$location.path("/collections/"+$scope.collection.id+"/"+$scope.document.id);
					},
					function err(error) {
						ErrorHandler.handle(error);
					} 
				);
			};
			
		}
	]);