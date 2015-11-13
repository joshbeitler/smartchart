(function() {
  'use strict';

  angular
    .module('auth.facebook')
    .directive('spFacebook', function() {
      return {
        bindToController: true,
        controller: FacebookController,
        controllerAs: 'vm',
        templateUrl: './javascripts/auth/facebook/auth.facebook.html'
      };
    });

  FacebookController.$inject = [
    '$attrs',
    '$timeout',
    '$scope',
    '$state',
    '$mdToast'
  ]

  function FacebookController($attrs, $timeout, $scope, $state, $mdToast) {
    var ref = new Firebase('https://sparktesting.firebaseio.com/');

    var vm = this;
    vm.facebook = {};
    vm.facebook.login = login;
    vm.facebook.logout = logout;
    vm.authed = false;

    function login() {
      ref.authWithOAuthPopup("facebook", function() {
        $mdToast.show($mdToast.simple().content(
          'Successfully logged in'));
      });
    }

    function logout() {
      ref.unauth();
      vm.authed = false;
    }

    function onAuthCallback(authData) {
      if (authData) {
        $timeout(function() {
          vm.user = authData;
          vm.authed = true;
        })
      }
    }
    ref.onAuth(onAuthCallback);
  }
})();
