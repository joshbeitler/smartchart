(function() {
  angular
    .module('child.prize')
    .directive('scPrize', function() {
      return {
        bindToController: true,
        controller: PrizeController,
        controllerAs: 'prize',
        templateUrl: './javascripts/child/prize/child.prize.html'
      };
    });

  PrizeController.$inject = [
    '$attrs',
    '$timeout',
    '$scope',
    '$state',
    '$location',
    '$firebaseObject'
  ];

  function PrizeController($attrs, $timeout, $scope, $state, $location,
    $firebaseObject) {
    var id = $location.path().split('/')[3]; // string black magic

    var ref = new Firebase('https://cranium.firebaseio.com');
    var user = ref.getAuth();
    var dataRef = ref.child('112496459354292613741').child('rewards')[id];
    var data = $firebaseObject(dataRef);
    consle.log(data);

    data.$bindTo($scope, "data");
  }
})();
