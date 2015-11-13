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

    var colors = [
      '#B2DFDB',
      '#BBDEFB',
      '#F8BBD0',
      '#B2EBF2',
      '#F0F4C3',
      '#C8E6C9',
      '#E1BEE7',
      'FFCCBC'
    ];

    $(document).ready(function() {
      $.map($('.chore'), function(i) {
        $(i).height($(i).width());
        $(i).css('background-color', colors[Math.floor(Math.random() *
          colors.length)]);
      });
    });
  }
})();
