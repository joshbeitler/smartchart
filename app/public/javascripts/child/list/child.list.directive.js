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

    // dataRef.child('chores').set([{
    //   'icon': '/images/choreIcons/Trash.svg',
    //   'name': 'Take out trash',
    //   'points': 10,
    //   'id': 0,
    //   'desc': 'Empty all the trash cans.'
    // }, {
    //   'icon': '/images/choreIcons/brushTeeth.svg',
    //   'name': 'Brush teeth',
    //   'points': 5,
    //   'id': 1,
    //   'desc': 'Keep those cavities away!'
    // }, {
    //   'icon': '/images/choreIcons/Dishes.svg',
    //   'name': 'Dishes',
    //   'points': 20,
    //   'id': 2,
    //   'desc': 'Clean up the kitchen.'
    // }, {
    //   'icon': '/images/choreIcons/Sweeping.svg',
    //   'name': 'Sweep floor',
    //   'points': 10,
    //   'id': 3,
    //   'desc': 'Make sure to get the corners.'
    // }, {
    //   'icon': '/images/choreIcons/vacuum.svg',
    //   'name': 'Vacuum',
    //   'points': 25,
    //   'id': 4,
    //   'desc': 'Vacuum living room'
    // }]);

    var data = $firebaseObject(dataRef);

    console.log(data);

    data.$bindTo($scope, "data");
  }
})();
