(function() {
'use strict';

  angular
    .module('app.program')
    .factory('Subject', Subject);

  Subject.$inject = ['$resource'];
  function Subject($resource) {
    var SubjectResource = $resource('/api/subjects/:subjectId', { subjectId: '@_id'}, {
      update: {
        method: "PUT"
      }
    });

    var service = {
      GetAllSubject: getAllSubject,
      GetSubject: getSubject,
      CreateSubject: createSubject,
      UpdateSubject: updateSubject,
      DeleteSubject: deleteSubject
    };
    
    return service;

    ////////////////
    function getAllSubject() { 
      return SubjectResource.query().$promise;
    }

    function getSubject(id) {
      return SubjectResource.get({ subjectId: id }).$promise;
    }

    function createSubject(subject) {
      return SubjectResource.save(subject).$promise;
    }

    function updateSubject(subject) {
      return SubjectResource.update(subject).$promise;
    }

    function deleteSubject(id) {
      return SubjectResource.remove({ subjectId: id }).$promise;
    }
  }
})();