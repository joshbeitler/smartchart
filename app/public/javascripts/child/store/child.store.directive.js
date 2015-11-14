(function() {
  angular
    .module('child.store')
    .directive('scStore', function() {
      return {
        bindToController: true,
        controller: StoreController,
        controllerAs: 'store',
        templateUrl: './javascripts/child/store/child.store.html'
      };
    });

  StoreController.$inject = [
    '$attrs',
    '$timeout',
    '$scope',
    '$state',
    '$firebaseObject',
    '$location'
  ];

  function StoreController($attrs, $timeout, $scope, $state, $firebaseObject,
    $location) {
    var id = $location.path().split('/')[3]; // string black magic

    var ref = new Firebase('https://cranium.firebaseio.com');
    var user = ref.getAuth();
    var dataRef = ref.child('112496459354292613741').child('children').child(
      id);
    var data = $firebaseObject(dataRef);

    data.$bindTo($scope, "data");
  }
})();
