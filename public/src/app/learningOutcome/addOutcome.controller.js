(function () {
  'use strict';

  angular
    .module('app.outcome')
    .controller('AddOutcomeController', AddOutcomeController);

  AddOutcomeController.$inject = ['$uibModalInstance', '$http', '$timeout', 'Outcome'];
  function AddOutcomeController($uibModalInstance, $http, $timeout, Outcome) {
    var vm = this;

    activate();

    vm.outcome = {
      majors: [],
      path: ""
    };

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
    }

    function apply() {
      var promise = {};

      addMajors();

      promise = Outcome.NewNode(vm.outcome);
      promise.then(function (res) {
        $uibModalInstance.close(res);
      });
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