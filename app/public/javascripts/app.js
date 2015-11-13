(function() {
  'use strict';

  var app = angular.module('myApp', [
    'ui.router',
    'firebase',
    'ngMaterial',
    'ngAnimate',
    'ngAria',
    'anim-in-out',
    'angularRipple',

    // Add app-specific directives here
    'notifications',
    'auth',
    'child'
  ]).config(function($mdThemingProvider, $locationProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('pink');
  });

  app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('loginState', {
      url: "/auth/login",
      templateUrl: "/views/login.ejs"
    });

    $stateProvider.state('homeState', {
      url: "/dash",
      templateUrl: "/views/home.ejs"
    });

    $stateProvider.state('detailState', {
      url: "/app/chores/{id}",
      templateUrl: "/views/choreDetail.ejs",
      controller: function($scope) {
        $scope.$on('$viewContentLoaded', function(event) {
          var color = localStorage.getItem('color');
          $('#choreDetail').css('background-color', color);
        });
      }
    });

    $stateProvider.state('storeState', {
      url: "/app/store",
      templateUrl: "/views/store.ejs"
    });

    $stateProvider.state('appState', {
      url: "/app",
      templateUrl: "/views/app.ejs",
      controller: function($scope) {
        $scope.$on('$viewContentLoaded', function(event) {
          $('.chores').on("scroll", function() {
            if ($(this).scrollTop() > 100) {
              $(this).parent().find("header").addClass(
                "shrink");
            } else {
              $(this).parent().find("header").removeClass(
                "shrink");
            }
          });
        });
      }
    });

    $urlRouterProvider.otherwise('/auth/login');
  });
})();
