(function() {
  angular
    .module('child.list')
    .directive('scList', function() {
      return {
        bindToController: true,
        controller: ListController,
        controllerAs: 'list',
        templateUrl: './javascripts/child/list/child.list.html'
      };
    });

  ListController.$inject = [
    '$attrs',
    '$timeout',
    '$scope',
    '$state',
    '$firebaseObject'
  ];

  function ListController($attrs, $timeout, $scope, $state, $firebaseObject) {
    var ref = new Firebase('https://cranium.firebaseio.com');
    var user = ref.getAuth();
    var dataRef = ref.child('112496459354292613741');

    dataRef.child('chores').set([{
      'icon': '/images/choreIcons/Trash.svg',
      'name': 'Take out trash',
      'points': 10,
      'id': 0
    }, {
      'icon': '/images/choreIcons/brushTeeth.svg',
      'name': 'Brush teeth',
      'points': 5,
      'id': 1
    }]);

    var data = $firebaseObject(dataRef);

    console.log(data);

    data.$bindTo($scope, "data");
  }
})();
