(function () {
  'use strict';

  angular
    .module('app.program')
    .controller('SubjectModalController', SubjectModalController);

  SubjectModalController.$inject = ['subject', '$uibModalInstance', 'Subject'];
  function SubjectModalController(subject, $uibModalInstance, Subject) {
    var isCreateNew = null;
    var vm = this;
    vm.subject = null;
    vm.Cancel = cancel;
    vm.Ok = ok;

    activate();

    ////////////////

    function activate() {
      if (!subject) {
        isCreateNew = true;
        vm.subject = {
          code: null,
          name: null,
          credit: null,
          hour: {
            theory: null,
            practice: null,
          },
          description: null
        }
      }
      else {
        isCreateNew = false;
        vm.subject = subject;
      }

      console.log(vm.subject);
    }

    function cancel() {
      $uibModalInstance.dismiss();
    }

    function ok() {
      if (isCreateNew) {
        Subject
          .CreateSubject(vm.subject)
          .then(function(subject) {
            $uibModalInstance.close(subject);
          })
          .catch(function(err) {
            $uibModalInstance.dismiss(err);
          });
      }
      else {
        Subject
          .UpdateSubject(vm.subject)
          .then(function(res) {
            $uibModalInstance.close(vm.subject);
          })
          .catch(function(err) {
            $uibModalInstance.dismiss(err);
          })
      }
    }
  }
})();