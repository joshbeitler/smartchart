(function() {
  'use strict';

  var app = angular.module('parent', [
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
    $urlRouterProvider.otherwise('admin/auth/login');

    $stateProvider.state('loginState', {
      url: "admin/auth/login",
      templateUrl: "/views/login.ejs"
    });

    $stateProvider.state('homeState', {
      url: "admin/dash",
      templateUrl: "/views/home.ejs"
    });

    $stateProvider.state('scheduleState', {
      url: "admin/schedule",
      templateUrl: '/views/schedule.ejs'
    })

    $stateProvider.state('storeState', {
      url: "admin/edit/store",
      templateUrl: '/views/editStore.ejs'
    })
  });
})();
