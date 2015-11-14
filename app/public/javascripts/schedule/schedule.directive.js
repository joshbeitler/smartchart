(function(){
  'use strict';

  angular
    .module('schedule')
    .directive('scSchedule', function() {
      return {
        bindToController: true,
        controller: ScheduleController,
        controllerAs: 'schedule',
        templateUrl: './javascripts/schedule/schedule.html'
      }
    });

    ScheduleController.$inject = ['$firebaseArray', '$scope'];

    function ScheduleController($firebaseArray, $scope) {
      var ref = new Firebase('https://cranium.firebaseio.com');
      var user = ref.getAuth();
      var choreRef = ref.child(user.google.id).child('chores');
      var schedule = this;
      schedule.addChore = addChore;


      schedule.chores = $firebaseArray(choreRef);

      function addChore(){
        schedule.chores.$add({
          icon: '/images/choreIcons/Brain.svg',
          id: schedule.chores.length,
          name: $scope.choreName,
          desc: $scope.choreDesc,
          points: $scope.chorePoints

        }).then(function(){
          $scope.choreName = '';
          $scope.chorePoints = '';
          $scope.choreDesc = '';
        });
      }
    }
})();