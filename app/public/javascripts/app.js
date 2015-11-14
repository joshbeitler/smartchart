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
    'child',
    'dash',
    'schedule',
    'editStore',
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

    $stateProvider.state('rewardState', {
      url: "/app/rewards/{id}",
      templateUrl: "/views/rewardDetail.ejs",
      controller: function($scope) {
        $scope.$on('$viewContentLoaded', function(event) {
          var color = localStorage.getItem('color');
          $('#rewardDetail').css('background-color', color);
        });
      }
    });

    $stateProvider.state('storeState', {
      url: "/app/store/{id}",
      templateUrl: "/views/store.ejs"
    });

    $stateProvider.state('appState', {
      url: "/app",
      templateUrl: "/views/app.ejs",
      controller: function($scope) {
        $scope.$on('$viewContentLoaded', function(event) {
          function getDateTime() {
            var now = new Date();
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            var day = now.getDate();
            var hour = now.getHours();
            var minute = now.getMinutes();
            var second = now.getSeconds();
            if (month.toString().length == 1) {
              var month = '0' + month;
            }
            if (day.toString().length == 1) {
              var day = '0' + day;
            }
            if (hour.toString().length == 1) {
              var hour = '0' + hour;
            }
            if (hour > 12) {
              hour -= 12;
            } else if (hour === 0) {
              hour = 12;
            }
            if (minute.toString().length == 1) {
              var minute = '0' + minute;
            }
            if (second.toString().length == 1) {
              var second = '0' + second;
            }
            var dateTime = year + '/' + month + '/' + day + ' ' +
              hour + ':' + minute + ':' + second;
            return dateTime;
          }

          setInterval(function() {
            $('#time>span').text(getDateTime());
          }, 1000);

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

    $stateProvider.state('editStoreState', {
      url: '/edit/store',
      templateUrl: "/views/editStore.ejs"
    })

    $stateProvider.state('scheduleState', {
      url: '/edit/schedule',
      templateUrl: '/views/editSchedule.ejs',
    })

    $urlRouterProvider.otherwise('/auth/login');
  });
})();
