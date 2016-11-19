(function() {
'use strict';

    angular
        .module('app.outcome')
        .controller('OutcomeController', OutcomeController);

    OutcomeController.$inject = ['$http'];
    function OutcomeController($http) {
        var vm = this;

        activate();

        ////////////////

        function activate() { }
    }
})();