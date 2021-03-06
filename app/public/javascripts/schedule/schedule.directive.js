(function() {
  'use strict'

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

  ScheduleController.$inject = ['$element', '$firebaseArray', '$scope',
    '$mdDialog', '$firebaseObject'
  ];

  function ScheduleController($element, $firebaseArray, $scope, $mdDialog,
    $firebaseObject) {
    var ref = new Firebase('https://cranium.firebaseio.com');
    var user = ref.getAuth();
    var choreRef = ref.child(user.google.id).child('chores');
    var childRef = ref.child(user.google.id).child('children');
    var schedule = this;

    schedule.addChore = addChore;
    schedule.showCreate = showCreate;
    schedule.close = closeDialog;
    schedule.chores = $firebaseArray(choreRef);
    schedule.add = add;
    schedule.childRef = childRef;
    schedule.children = $firebaseArray(childRef);
    schedule.getChoreName = getChoreName;

    schedule.date = new Date().getUTCDate();
    //
    var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    $('.month').text(monthNames[new Date().getMonth()]);

    var currentDate = schedule.date;

    schedule.forward = function(idx) {
      var td = Number(currentDate + 1);
      currentDate = td;
      $('.date').text(td);
      $('.choreDrag').remove();

      for (var c in schedule.children) {
        for (var d in schedule.children[c].assigned) {
          if (schedule.children[c].assigned[d].date === td) {
            $('#day-' + schedule.children[c].id).append(
              '<div class="choreDrag">' + getChoreName(schedule.children[
                  c]
                .assigned[d]
                .choreId) +
              '</div>');
          }
        }
      }
    }

    schedule.back = function(idx) {
      var td = Number(currentDate - 1);
      currentDate = td;
      $('.date').text(td);
      $('.choreDrag').remove();

      for (var c in schedule.children) {
        for (var d in schedule.children[c].assigned) {
          if (schedule.children[c].assigned[d].date === td) {
            $('#day-' + schedule.children[c].id).append(
              '<div class="choreDrag">' + getChoreName(schedule.children[
                  c]
                .assigned[d]
                .choreId) +
              '</div>');
          }
        }
      }
    }

    function showCreate(ev) {
      $mdDialog.show({
          controllerAs: 'ctlr',
          controller: function() {},
          templateUrl: './javascripts/schedule/addChore.tmpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          scope: $scope.$new()
        })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
    };

    function closeDialog() {
      $mdDialog.cancel();
    }

    function add(choreId, idx) {
      var choreData = schedule.chores[choreId];

      // $('#day-' + idx).append('<div class="choreDrag">' + choreData.name +
      //   '</div>');

      var c = $firebaseArray(schedule.childRef.child(idx).child('assigned'));
      c.$add({
        choreId: choreId,
        date: currentDate
      });
    }

    function getChoreName(id) {
      var choreData = schedule.chores[id];
      return choreData.name;
    }

    function addChore() {
      schedule.chores.$add({
        icon: '/images/choreIcons/Brain.svg',
        id: schedule.chores.length,
        name: $scope.$$childTail.choreName,
        desc: $scope.$$childTail.choreDesc,
        points: $scope.$$childTail.chorePoints
      }).then(function() {
        $scope.$$childTail.choreName = '';
        $scope.$$childTail.chorePoints = '';
        $scope.$$childTail.choreDesc = '';

        closeDialog();
      });
    }
  }
})();
