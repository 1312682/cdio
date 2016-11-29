(function() {
'use strict';

  angular
    .module('app.program')
    .factory('Program', Program);

  Program.$inject = ['$resource'];
  function Program($resource) {
    var ProgramResource = $resource('/api/programs/:programId', { programId: '@programId' }, {
      getAllFaculty: {
        method: "GET",
        url: "/api/programs/faculties",
        isArray: true
      },
      getAllType: {
        method: "GET",
        url: "/api/programs/types",
        isArray: true
      }
    });

    var service = {
      GetAllProgram: getAllProgram,
      GetProgram: getProgram,
      CreateProgram: createProgram,
      UpdateProgram: updateProgram,
      GetAllFaculty: getAllFaculty,
      GetAllType: getAllType
    };
    
    return service;

    ////////////////
    function getAllProgram() { 
      return ProgramResource.query().$promise;
    }

    function getProgram(id) {
      return ProgramResource.get({ programId: id}).$promise;
    }

    function createProgram(program) {
      return ProgramResource.save(program).$promise;
    }

    function updateProgram(program) {
      return ProgramResource.put(program).$promise;
    }

    function getAllFaculty(name) {
      return ProgramResource.getAllFaculty({ name: name }).$promise;
    }

    function getAllType(name) {
      return ProgramResource.getAllType({ name: name }).$promise;
    }
  }
})();