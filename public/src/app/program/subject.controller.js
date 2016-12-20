(function () {
  'use strict';

  angular
    .module('app.program')
    .controller('SubjectController', SubjectController);

  SubjectController.$inject = ['$uibModal', 'Subject'];
  function SubjectController($uibModal, Subject) {
    var vm = this;
    vm.subjects = null;
    vm.selectedSubjectIndex = null;
    vm.AddSubject = addSubject;
    vm.EditSubject = editSubject;
    vm.DeleteSubject = deleteSubject;
    vm.SelectSubject = selectSubject;

    activate();

    ////////////////

    function activate() {
      Subject
        .GetAllSubject()
        .then(function (subjects) {
          vm.subjects = subjects
        })
        .catch(function (err) {
          console.log(err);
        });
    }

    function addSubject() {
      $uibModal
        .open({
          controller: 'SubjectModalController',
          controllerAs: 'vm',
          templateUrl: 'app/program/modals/subjectModal.html',
          size: 'md',
          resolve: {
            subject: function() {
              return null;
            }
          }
        })
        .result.then(function (subject) {
          vm.subjects.push(subject);
        });
    }

    function editSubject() {
      $uibModal
        .open({
          controller: 'SubjectModalController',
          controllerAs: 'vm',
          templateUrl: 'app/program/modals/subjectModal.html',
          size: 'md',
          resolve: {
            subject: function() {
              return angular.copy(vm.subjects[vm.selectedSubjectIndex]);
            }
          }
        })
        .result.then(function (subject) {
          vm.subjects[vm.selectedSubjectIndex] = subject;
        });
    }

    function deleteSubject() {
      Subject
        .DeleteSubject(vm.subjects[vm.selectedSubjectIndex]._id)
        .then(function(res) {
          return vm.subjects.splice(vm.selectedSubjectIndex, 1);
          vm.selectedSubjectIndex = null;
        })
        .catch(function(err) {
          console.log(err);
        })
    }

    function selectSubject(index) {
      vm.selectedSubjectIndex = index;
    }
  }
})();