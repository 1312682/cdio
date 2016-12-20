(function() {
'use strict';

  angular
    .module('app.program')
    .factory('Block', Block);

  Block.$inject = ['$resource'];
  function Block($resource) {
    var BlockResource = $resource('/api/programs/:programId/blocks/:blockId', { programId: '@programId', blockId: '@blockId' }, {
      update: {
        method: 'PUT'
      }
    });

    var service = {
      GetAllBlock: getAllBlock,
      GetBlock: getBlock,
      AddBlock: addBlock,
      UpdateBlock: updateBlock,
      DeleteBlock: deleteBlock,
     };
    
    return service;

    ////////////////
    function getAllBlock(programId) { 
      return BlockResource.query({programId: programId}).$promise;
    }

    function getBlock(params) {
      return BlockResource.get(params).$promise;
    }

    function addBlock(params) {
      return BlockResource.save(params).$promise;
    }

    function updateBlock(params) {
      return BlockResource.update(params).$promise;
    }

    function deleteBlock(params) {
      return BlockResource.remove(params).$promise;

    }
  }
})();