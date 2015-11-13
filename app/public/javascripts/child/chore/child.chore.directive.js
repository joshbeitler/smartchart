(function() {
  angular
    .module('child.chore')
    .directive('scChore', function() {
      return {
        bindToController: true,
        controller: ChoreController,
        controllerAs: 'chore',
        templateUrl: './javascripts/child/chore/child.chore.html'
      };
    });

  ChoreController.$inject = [
    '$attrs',
    '$timeout',
    '$scope',
    '$state'
  ];

  function ChoreController($attrs, $timeout, $scope, $state) {
    // This needs to be done with a constant
    var ref = new Firebase('https://cranium.firebaseio.com/');
    var chore = this;
    chore.id = $attrs.id;

    $(document).ready(function() {
      $.map($('.chore'), function(i) {
        $(i).height($(i).width());
      });
    });
  }
})();
