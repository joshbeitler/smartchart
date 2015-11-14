(function() {
  'use strict';

  angular
    .module('dash')
    .directive('scDash', function() {
      return {
        bindToController: true,
        controller: DashController,
        controllerAs: 'dash',
        templateUrl: './javascripts/dashboard/dash.html'
      };
    });

  DashController.$inject = ['$firebaseObject', '$scope']

  function DashController($firebaseObject, $scope) {
    var ref = new Firebase('https://cranium.firebaseio.com')
    var user = ref.getAuth();
    var dataRef = ref.child('112496459354292613741').child('children');
    var dash = this;

    dataRef.set([{
      'name': 'Ben',
      'color': '#F06292',
      'picture': '/images/profileIcons/blue.svg',
      'assigned': [
        0,
        1
      ]
    }, {
      'name': 'Josh',
      'color': '#64FFDA',
      'picture': '/images/profileIcons/goofy.svg',
      'assigned': [
        0
      ]
    }, {
      'name': 'Ben',
      'color': '#BA68C8',
      'picture': '/images/profileIcons/blue.svg',
      'assigned': [
        1
      ]
    }, {
      'name': 'Jake',
      'color': '#FFB74D',
      'picture': '/images/profileIcons/tooth.svg',
      'assigned': [
        0,
        1
      ]
    }]);

    var data = $firebaseObject(dataRef);
    data.$bindTo($scope, "data");
  }
})();
