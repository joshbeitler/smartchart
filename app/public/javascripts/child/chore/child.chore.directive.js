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

    $scope.$watch(function() {
      return [$attrs.cname, $attrs.icon, $attrs.points, $attrs.cid];
    }, function() {
      chore.icon = $attrs.icon;
      chore.cname = $attrs.cname;
      chore.points = $attrs.points;
      chore.cid = $attrs.cid;
    }, true);

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
        var color = colors[Math.floor(Math.random() *
          colors.length)];
        localStorage.setItem('color', color);
        $(i).css('background-color', color);
      });
    });
  }
})();
