(function() {
  angular
    .module('child.detail')
    .directive('scDetail', function() {
      return {
        bindToController: true,
        controller: DetailController,
        controllerAs: 'detail',
        templateUrl: './javascripts/child/detail/child.detail.html'
      };
    });

  DetailController.$inject = [
    '$attrs',
    '$timeout',
    '$scope',
    '$state',
    '$location',
    '$firebaseObject'
  ];

  function DetailController($attrs, $timeout, $scope, $state, $location,
    $firebaseObject) {
    var id = $location.path().split('/')[3]; // string black magic

    var ref = new Firebase('https://cranium.firebaseio.com');
    var user = ref.getAuth();
    var dataRef = ref.child('112496459354292613741').child('chores').child(id);
    var data = $firebaseObject(dataRef);

    console.log(data);

    data.$bindTo($scope, "data");
  }
})();
