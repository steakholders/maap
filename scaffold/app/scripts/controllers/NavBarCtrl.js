/*
 * Name : NavbarCtrl.js
 * Module : Fornt-End::Controllers
 * Location : /scaffold/app/scripts/controllers
 *
 * History :
 *
 * Version         Date           Programmer
 * =================================================
 * 0.0.1           2014-03-01     Federico Poli
 * -------------------------------------------------
 * Codifica Modulo.
 * =================================================
 */

"use strict";

angular.module("controllers")
	.controller('NavBarCtrl', ["$scope", "$location", "$route", "showSignup", "navBarCollections",
		function ($scope, $location, $route, showSignup, navBarCollections) {

        $scope.isActive = function (viewLocation) {
            if(viewLocation === $location.path()){
                return true;
            }
        };
        
        $scope.refresh = function(path) {
            if(path === "/users") {
                $location.path(path);
                $route.reload();
            } else {
                var refresh_path = "/collections/"+path;
                $location.path(refresh_path);
            }
        };

        $scope.showSignup = showSignup;
        $scope.navBarCollections = navBarCollections;
    }
  ]);
