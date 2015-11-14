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
    '$location',
    '$firebaseArray'
  ];

  function StoreController($attrs, $timeout, $scope, $state, $firebaseObject,
    $location, $firebaseArray) {
    var id = $location.path().split('/')[3]; // string black magic

    var ref = new Firebase('https://cranium.firebaseio.com');
    var user = ref.getAuth();
    var dataRef = ref.child('112496459354292613741');
    var childRef = dataRef.child('children').child(
      id);
    var data = $firebaseObject(childRef);
    data.$bindTo($scope, "data");

    var store = this;
    store.rewards = $firebaseArray(dataRef.child('rewards'));;
  }
})();
