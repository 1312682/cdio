(function() {
  'use strict';

  angular
    .module('app.program')
    .run(runApp);

  function runApp(routerHelper) {
    routerHelper.configureStates(getState());
  }

  function getState() {
    return [
      {
        state: 'program',
        config: {
          url: '/program',
          templateUrl: 'app/program/program.html',
          controller: 'ProgramController',
          controllerAs: 'vm'
        }
      },
      {
        state: 'subject',
        config: {
          url: '/subject',
          templateUrl: 'app/program/subject.html',
          controller: 'SubjectController',
          controllerAs: 'vm'
        }
      }
    ]
  }
})();