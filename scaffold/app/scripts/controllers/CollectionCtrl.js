/*
 * Name : CollectionCtrl.js
 * Module : Front-End::Controllers::CollectionController
 * Location : /scaffold/app/scripts/controllers
 *
 * History :
 *
 * Version         Date           Programmer
 * =================================================
 * 0.0.1           2014-03-04     Federico Poli
 * -------------------------------------------------
 * Codifica Modulo.
 * =================================================
 */
 
"use strict";

angular.module("controllers")
	.controller('CollectionCtrl', ["$scope", "$location", "$routeParams", "CollectionService", "DocumentService" , "ErrorHandler", "FlashMessage",
	function ($scope, $location, $routeParams, CollectionService, DocumentService, ErrorHandler, FlashMessage) {

		$scope.page = $routeParams.page || 1;
		$scope.sort = $routeParams.sort || "";
		$scope.ascending = ($routeParams.order !== "desc");

		$scope.collection = {
			id: $routeParams.collectionId,
			name: "",
			label: "",
			numdocs: 0,
			perpage: 1
		};

		var getData = function() {
			var order = "";
			if($scope.sort === "") {
				order = "";
			} else {
				order = $scope.ascending?"asc":"desc";
			}

			CollectionService.query({
					collectionId: $scope.collection.id,
					page: $scope.page,
					sort: $scope.sort,
					order: order
				},
				function success(data) {
					$scope.collection = data;
					paginate_collection();
				},
				function err(error){
					ErrorHandler.handle(error);
				}
			);
		};

		getData();

		var refresh = function() {
			// Refresh for search is disabled in app.js
			$location.search({
				page: $scope.page,
				sort: $scope.sort,
				order: $scope.ascending?"asc":"desc"
			});

			getData();
		};

		$scope.selectClass = function (column) {
			if (column.sortable) {
				if (column.name === $scope.sort) {
					return "sort-" + $scope.ascending;
				}
			} else {
				return "sort-none";
			}
		};

		$scope.changeSorting = function(column) {
			if (column.sortable) {
				if ($scope.sort === column.name) {
					$scope.ascending = !$scope.ascending;
				} else {
					$scope.sort = column.name;
					$scope.ascending = true;
				}
				refresh();
			}
		};

		/*============ PAGINATE COLLECTION ============ */
		var paginate_collection = function () {
			var totPages = 1;
			var visPages = 10;
			var docs_perpage = $scope.collection.perpage;
			var docs_tot = $scope.collection.numdocs;

			if (docs_perpage !== 0) {
				totPages = Math.ceil(docs_tot/docs_perpage);
			}
			if (totPages < visPages ) {
				visPages = totPages;
			}
			$scope.hidePaginate = (totPages <= 1);

			$('#paginate-collection').twbsPagination({
				totalPages: totPages,
				visiblePages: visPages,
				startPage: $scope.page,
				onPageClick: function (event, page) {
					if (page !== $scope.page) {
						$scope.page = page;
						refresh();
					}
				}
			});
		};

		$scope.delete_document = function (document) {
			if(confirm("Delete Document?")){
				DocumentService.remove({
						collectionId: $scope.collection.id,
						documentId: document.id
					},
					function success() {
						FlashMessage.set({ type: "success", title: "Success!", message: "Document has been deleted." });
						refresh();
					},
					function error(err) {
						ErrorHandler.handle(err);
					}
				);
			}
		};

	}
]);
