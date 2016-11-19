(function() {
'use strict';

    angular
        .module('app.training')
        .controller('TrainingController', TrainingController);

    TrainingController.$inject = ['$http'];
    function TrainingController($http) {
        var vm = this;

        activate();

        ////////////////

        function activate() { }
    }
})();