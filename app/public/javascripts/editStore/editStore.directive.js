(function() {
  'use strict';

  angular
    .module('editStore')
    .directive('scEditStore', function() {
      return {
        bindToController: true,
        controller: EditStoreController,
        controllerAs: 'editStore',
        templateUrl: './javascripts/editStore/editStore.html'
      }
    });

  EditStoreController.$inject = ['$firebaseArray', '$scope'];

  function EditStoreController($firebaseArray, $scope) {
    var ref = new Firebase('https://cranium.firebaseio.com');
    var user = ref.getAuth();
    var rewardsRef = ref.child(user.google.id).child('rewards');
    var editStore = this;

    editStore.rewards = $firebaseArray(rewardsRef);
    editStore.addReward = addReward;

    function addReward() {
      editStore.rewards.$add({
        name: $scope.rewardName,
        points: $scope.rewardPoints,
        id: editStore.rewards.length,
        icon: '/images/rewardIcons/videoGames.svg'
      }).then(function() {
        $scope.rewardName = '';
        $scope.rewardPoints = '';
      });
    }
  }
})();
