(function () {
  'use strict';

  angular
    .module('app.program')
    .controller('BlockModalController', BlockModalController);

  BlockModalController.$inject = ['programId', 'block', 'parentPath', '$uibModal', '$uibModalInstance', 'Block'];
  function BlockModalController(programId, block, parentPath = null, $uibModal, $uibModalInstance, Block) {
    var vm = this;
    var isCreate = null;

    vm.block = null;
    vm.Cancel = cancel;
    vm.Ok = ok;
    vm.EditCourse = editCourse;

    activate();

    ////////////////

    function activate() {
      if (!block) {
        vm.block = {
          name: null,
          path: parentPath,
          children: [],
          courses: []
        };
        isCreate = true;
      }
      else {
        vm.block = block;
        isCreate = false;
      }
    }

    function cancel() {
      $uibModalInstance.dismiss();
    }

    function ok() {
      if (isCreate) {
        Block
          .AddBlock({
            programId: programId,
            name: vm.block.name,
            path: vm.block.path,
            majors: vm.block.majors,
            courses: vm.block.courses
          })
          .then(function (block) {
            vm.block._id = block._id;
            vm.block.path = block.path;
            $uibModalInstance.close(vm.block);
          })
          .catch(function(err) {
            console.log(err);
          });
      }
      else {
        Block
          .UpdateBlock({
            programId: programId,
            blockId: vm.block._id,
            name: vm.block.name,
            path: vm.block.path,
            majors: vm.block.majors,
            courses: vm.block.courses
          })
          .then(function() {
            $uibModalInstance.close(vm.block);
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    }

    function editCourse() {
      $uibModal
        .open({
          controller: 'CourseModalController',
          controllerAs: 'vm',
          templateUrl: 'app/program/modals/courseModal.html',
          resolve: {
            courses: function () {
              return vm.block.courses;
            }
          },
          size: 'md'
        })
        .result.then(function (courses) {
          vm.block.courses = courses;
        });
    }
  }
})();