(function() {
    'use strict';

    angular
        .module('app.program')
        .run(runApp);
    
    function runApp(routerHelper) {
        routerHelper.configureStates(getStates());
    }
    
    function getStates() {
        return [
            {
                state: 'program',
                config: {
                    url: '/program',
                    templateUrl: 'app/program/program.html',
                    controller: 'ProgramController',
                    controllerAs: 'vm'
                }
            }
        ];
    }
})();