(function() {
  'use strict';

  var app = angular.module('myApp', [
    'ui.router',
    'firebase',
    'auth',
    'ngMaterial',
    'ngAnimate',
    'ngAria',

    // Add app-specific directives here
    'notifications'
  ]).config(function($mdThemingProvider, $locationProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('pink');
  });

  app.config(function($stateProvider, $urlRouterProvider) {
    // TODO: replace this with /dash if logged in
    $urlRouterProvider.otherwise('/auth/login');

    $stateProvider.state('loginState', {
      url: "/auth/login",
      templateUrl: "/views/login.ejs"
    });

    $stateProvider.state('homeState', {
      url: "/dash",
      templateUrl: "/views/home.ejs"
    });
  });
})();
