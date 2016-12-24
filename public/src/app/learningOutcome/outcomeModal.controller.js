(function () {
  'use strict';

  angular
    .module('app.outcome')
    .controller('OutcomeModalController', OutcomeModalController);

  OutcomeModalController.$inject = ['outcome', '$uibModalInstance', '$scope', 'Outcome'];
  function OutcomeModalController(outcome, $uibModalInstance, $scope, Outcome) {
    var vm = this;
    var isCreateNew = true;
    activate();

    vm.Apply = apply;

    ////////////////

    function activate() {
      vm.majorsOutcome = {
        first: "Công nghệ phần mềm",
        second: "Khoa học máy tính",
        third: "Hệ thống thông tin",
        fourth: "Mạng máy tính và truyền thông",
        fifth: "Công nghệ tri thức",
        sixth: "Thị giác máy tính và khoa học robot"
      }

      if (!outcome) {
        isCreateNew = true;
        vm.outcome = {
          title: null,
          path: null,
          majors: null
        }
      }
      else {
        isCreateNew = false;
        vm.outcome = outcome;
      }
      console.log(vm.outcome);
      $scope.$evalAsync();
    }

    function apply() {
      addMajors();

      if (isCreateNew) {
        Outcome
          .NewNode(vm.outcome)
          .then(function (res) {
            $uibModalInstance.close(res);
          })
          .catch(function (err) {
            $uibModalInstance.close(err);
          });
      }
      else {
        // Outcome
        // .UpdateNode(vm.outcome)
        // .then(function (res) {
        //   $uibModalInstance.close(res);
        // })
        // .catch(function (err) {
        //   $uibModalInstance.close(err);
        // });
        $uibModalInstance.close(vm.outcome);
      }
    }

    function addMajors() {
      for (var key in vm.majors) {
        if (vm.majors[key]) {
          vm.outcome.majors.push(vm.majorsOutcome[key]);
        }
        else {
          var index = vm.outcome.majors.indexOf(vm.majorsOutcome[key]);
          vm.outcome.majors.splice(index, 1);
        }
      }
    }
  }
})();