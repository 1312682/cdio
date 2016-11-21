(function() {
'use strict';

  angular
    .module('app.core')
    .factory('header', header);

  header.$inject = ['$rootScope'];
  function header($rootScope) {
    var header = '';

    var service = {
      setHeader: setHeader,
      getHeader: getHeader
    };
    
    return service;

    ////////////////
    function getHeader() { 
      return header;
    }

    function setHeader(newHeader) {
      header = newHeader;
      $rootScope.$emit('headerChanged', newHeader);
    }
  }
})();