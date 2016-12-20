(function () {
  'use strict';

  angular
    .module('app.program')
    .controller('CourseModalController', CourseModalController);

  CourseModalController.$inject = ['$uibModalInstance', 'Subject', 'courses'];
  function CourseModalController($uibModalInstance, Subject, courses) {
    var vm = this;
    vm.subjects = null;
    vm.Cancel = cancel;
    vm.Ok = ok;

    activate();

    ////////////////

    function activate() {
      Subject
        .GetAllSubject()
        .then(function (subjects) {
          vm.subjects = subjects;
          angular.forEach(courses, function (course, courseIndex) {
            angular.forEach(vm.subjects, function (subject, subjectIndex) {
              if (course._id == subject._id) {
                subject.selected = true;
              }
            });
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    }

    function cancel() {
      $uibModalInstance.dismiss();
    }

    function ok() {
      var result = [];

      angular.forEach(vm.subjects, function (value, index) {
        if (value.selected == true) {
          result.push(value);
        }
      });

      $uibModalInstance.close(result);
    }
  }
})();