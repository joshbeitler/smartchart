(function() {
  'use strict';

  angular
    .module('addChildren')
    .directive('scAddChild', function() {
      return {
        bindToController: true,
        controller: AddChildrenController,
        controllerAs: 'vm',
        templateUrl: './javascripts/addChildren/addChildren.html'
      }
    });

    AddChildrenController.$inject = ['$firebaseArray'];

    function AddChildrenController($firebaseArray, $scope) {
      var ref = new Firebase('https://cranium.firebaseio.com');
      var user = ref.getAuth();
      var childRef = ref.child(user.google.id).child('children');
      var vm = this;
      vm.addChild = addChild;

      vm.children = $firebaseArray(childRef);

      function addChild() {
        vm.children.$add({
          assigned: [],
          color: '#F06292',
          id: vm.children.length,
          name: vm.childName,
          points: 0,
          picture: 'pic'
        }).then(function() {
          vm.childName = '';
        })
        vm.ready = true;
      }

    }
})();