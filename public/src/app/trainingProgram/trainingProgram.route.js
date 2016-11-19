(function() {
    'use strict';

    angular
        .module('app.training')
        .run(runApp);
    
    function runApp(routerHelper) {
        routerHelper.configureStates(getStates());
    }
    
    function getStates() {
        return [
            {
                state: 'training',
                config: {
                    url: '/training',
                    templateUrl: 'app/trainingProgram/trainingProgram.html',
                    controller: 'TrainingController',
                    controllerAs: 'vm'
                }
            }
        ];
    }
})();