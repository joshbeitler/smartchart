(function() {
  'use strict';

  angular
    .module('child', [
      'child.chore',
      'child.reward',
      'child.list',
      'child.detail',
      'child.store'
    ])
})();
