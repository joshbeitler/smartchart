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
    var uid = $location.path().split('/')[4]; // string black magic

    var ref = new Firebase('https://cranium.firebaseio.com');
    var user = ref.getAuth();
    var dataRef = ref.child('112496459354292613741').child('chores').child(id);
    var child = ref.child('112496459354292613741').child('children').child(
      uid);
    var points = child.child('points');
    var data = $firebaseObject(dataRef);

    var detail = this;
    detail.id = id;
    detail.uid = uid;
    detail.a = points;
    detail.c = $firebaseObject(child);
    detail.p = $firebaseObject(points);
    detail.child = child;

    detail.completeJob = function() {
      for (var assn in detail.c.assigned) {
        var choreId = detail.c.assigned[assn].choreId;
        var myId = data.id;

        if (myId === choreId) {
          // Chore matched
          var points = data.points;
          var old = detail.c.points ? detail.c.points : 0;
          var newp = Number(points) + Number(old);

          detail.a.set(
            newp
          );

          detail.child.child('assigned').child(assn).set(null);

          $state.go('appState');

          // remove from assnd
        }
      }
    }

    data.$bindTo($scope, "data");
  }
})();
