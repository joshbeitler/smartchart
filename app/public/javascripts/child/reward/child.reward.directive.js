(function() {
  angular
    .module('child.reward')
    .directive('scReward', function() {
      return {
        bindToController: true,
        controller: RewardController,
        controllerAs: 'reward',
        templateUrl: './javascripts/child/reward/child.reward.html'
      };
    });

  RewardController.$inject = [
    '$attrs',
    '$timeout',
    '$scope',
    '$state'
  ];

  function RewardController($attrs, $timeout, $scope, $state) {
    // This needs to be done with a constant
    var ref = new Firebase('https://cranium.firebaseio.com/');
    var reward = this;

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
      $.map($('.reward'), function(i) {
        $(i).height($(i).width());
        var color = colors[Math.floor(Math.random() *
          colors.length)];
        localStorage.setItem('color', color);
        $(i).css('background-color', color);
      });
    });
  }
})();
