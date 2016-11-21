(function() {
'use strict';

  angular
    .module('app')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$rootScope', 'header'];
  function HeaderController($rootScope, header) {
    var vm = this;
    vm.header = '';

    $rootScope.$on('headerChanged', function(e, newHeader) {
      vm.header = newHeader;
    });

    activate();

    ////////////////

    function activate() { 
      vm.header = header.getHeader();
    }
  }
})();