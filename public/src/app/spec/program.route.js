(function() {
    'use strict';

    angular
        .module('app.spec')
        .run(runApp);
    
    function runApp(routerHelper) {
        routerHelper.configureStates(getStates());
    }
    
    function getStates() {
        return [
            {
                state: 'spec',
                config: {
                    url: '/spec',
                    templateUrl: 'app/spec/spec.html',
                    controller: 'SpecController',
                    controllerAs: 'vm'
                }
            }
        ];
    }
})();