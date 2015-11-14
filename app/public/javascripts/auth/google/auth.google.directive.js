(function() {
  'use strict';

  angular
    .module('auth.google')
    .directive('spGoogle', function() {
      return {
        bindToController: true,
        controller: GoogleController,
        controllerAs: 'vm',
        templateUrl: './javascripts/auth/google/auth.google.html'
      };
    });

  GoogleController.$inject = [
    '$attrs',
    '$timeout',
    '$scope',
    '$state',
    '$mdToast'
  ];

  function GoogleController($attrs, $timeout, $scope, $state, $mdToast) {
    // This needs to be done with a constant
    var ref = new Firebase('https://cranium.firebaseio.com');

    var vm = this;
    vm.google = {};
    vm.google.login = login;
    vm.google.logout = logout;
    vm.authed = false;

    function login() {
      ref.authWithOAuthPopup("google", function(err) {
        if (!err) {
          $mdToast.show($mdToast.simple().content(
            'Successfully logged in'));
        }
      });
    }

    function logout() {
      ref.unauth();
      vm.authed = false;
      $state.go('loginState');
    }

    function onAuthCallback(authData) {
      if (authData) {
        $timeout(function() {
          vm.user = authData;
          vm.authed = true;
          ref.child(vm.user.google.id).once('value', function(ss){
            if (ss.val() !== null) {
              $state.go('homeState');
            } else {
              $state.go('onboarding')
            }
          });
        })    
      };
    }
    ref.onAuth(onAuthCallback);
  }
})();
