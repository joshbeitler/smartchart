(function() {
  'use strict';

  var app = angular.module('myApp', [
    'ui.router',
    'firebase',
    'ngMaterial',
    'ngAnimate',
    'ngAria',

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
      controller: function($stateParams) {}
    });

    $stateProvider.state('appState', {
      url: "/app",
      templateUrl: "/views/app.ejs"
    });

    $urlRouterProvider.otherwise('/auth/login');
  });
})();
