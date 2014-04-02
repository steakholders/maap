/*
* Name : Directives.js
* Module : Front-End::Services
* Location : /scaffold/app/scripts/utils
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

// Prevent default event on mouse click
angular.module("utils")
	.directive("eatClick", function() {
		return function(scope, element) {
			$(element).click(function(event) {
				event.preventDefault();
			});
		};
	})

// See:
// https://github.com/angular/angular.js/issues/1460
// https://stackoverflow.com/questions/14965968/angularjs-browser-autofill-workaround-by-using-a-directive
	.directive("autofillfix", function () {
		return {
			restrict: "A",
			require: "ngModel",
			link: function(scope, element, attrs, ngModel) {
				setInterval(function() {
					var prev_val = '';
					if (!angular.isUndefined(attrs.xAutoFillPrevVal)) {
						prev_val = attrs.xAutoFillPrevVal;
					}
					if (element.val() !== prev_val) {
						if (!angular.isUndefined(ngModel)) {
							if (!(element.val() === "" && ngModel.$pristine)) {
								attrs.xAutoFillPrevVal = element.val();
								scope.$apply(function() {
									ngModel.$setViewValue(element.val());
								});
							}
						}
						else {
							element.trigger('input');
							element.trigger('change');
							element.trigger('keyup');
							attrs.xAutoFillPrevVal = element.val();
						}
					}
				}, 300);
			}
		};
	})

	.directive("scrollTo", function ($location, $anchorScroll) {
		return function(scope, element, attrs) {
			element.bind('click', function(event) {
				event.stopPropagation();
				event.preventDefault();

				var location = attrs.scrollTo;
				$location.hash(location);
				$anchorScroll();
			});
		};
	});