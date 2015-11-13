(function() {
  'use strict';

  angular
    .module('dash')
    .directive('scDash', function() {
      return {
        bindToController: true,
        controller: DashController,
        controllerAs: 'dash',
        templateUrl: './javascripts/dashboard/dash.html'
      };
    });

  DashController.$inject = ['$firebaseObject']

  function DashController($firebaseObject) {
    var ref = new Firebase('https://cranium.firebaseio.com')
    var user = ref.getAuth();
    var dataRef = ref.child(user.google.id);
    var dash = this;

    dataRef.set({
      children: ['Fred', 'Joe']
    })

    var data = $firebaseObject(dataRef);
    data.$bindTo(dash, "data");
  }
})();