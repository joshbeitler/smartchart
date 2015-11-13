(function() {
  angular
    .module('notifications')
    .directive('spNotifications', function() {
      return {
        bindToController: true,
        controller: NotificationsController,
        controllerAs: 'vm',
        templateUrl: './javascripts/notifications/notifications.html'
      };
    });

  NotificationsController.$inject = [
    '$attrs',
    '$timeout',
    '$scope',
    '$state'
  ];

  function NotificationsController($attrs, $timeout, $scope, $state) {
    // This needs to be done with a constant
    var ref = new Firebase('https://sparktesting.firebaseio.com/');
    var vm = this;
  }
})();
