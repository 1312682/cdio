(function() {
'use strict';

  angular
    .module('app.spec')
    .controller('TestController', TestController);

  TestController.$inject = ['header'];
  function TestController(header) {
    var vm = this;
    

    activate();

    ////////////////

    function activate() { 
      header.setHeader('Test');
    }
  }
})();