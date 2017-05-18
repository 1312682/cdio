(function() {
  'use strict';

  angular
    .module('app.outcome')
    .run(runApp);

  function runApp(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [{
      state: 'outcome',
      config: {
        url: '/outcome',
        templateUrl: 'app/learningOutcome/learningOutcome.html',
        controller: 'OutcomeController',
        controllerAs: 'vm'
      }
    }];
  }
})();