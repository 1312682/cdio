(function () {
  'use strict';

  angular
    .module('app')
    .directive('blockNode', blockNode);

  blockNode.inject = [''];
  function blockNode() {
    // Usage:
    //
    // Creates:
    //
    var directive = {
      require: '^^blockNodes',
      bindToController: true,
      templateUrl: 'app/directive/block-node.html',
      controller: BlockNodeController,
      controllerAs: 'vm',
      link: link,
      restrict: 'E',
      scope: {
        programId: '=',
        data: '=',
        tagFilter: '=',
        isEditable: '@editable'
      }
    };
    return directive;

    function link(scope, element, attrs, controllers) {
      scope.blockNodesController = controllers;
    }
  }
  /* @ngInject */
  BlockNodeController.$inject = ['$scope', '$uibModal', 'Block'];
  function BlockNodeController($scope, $uibModal, Block) {
    var vm = this;

    vm.AddBlock = addBlock;
    vm.DeleteBlock = deleteBlock;
    vm.EditBlock = editBlock;

    activate();

    ////////////////

    function activate() {
      console.log(vm.isEditable)
    }

    function deleteBlock() {
      Block
        .DeleteBlock({
          programId: vm.programId,
          blockId: vm.data._id
        })
        .then(function(res) {
          $scope.blockNodesController.DeleteBlock(vm.data);
        })
        .catch(function(err) {
          console.log(err);
        });
    }

    function addBlock() {
      $uibModal
        .open({
          controller: 'BlockModalController',
          controllerAs: 'vm',
          templateUrl: 'app/program/modals/blockModal.html',
          size: 'md',
          resolve: {
            block: function() {
              return null;
            },
            programId: function() {
              return vm.programId;
            },
            parentPath: function() {
              return vm.data.path;
            }
          }
        })
        .result.then(function (block) {
          vm.data.children.push(block);
        });
    }

    function editBlock() {
      $uibModal
        .open({
          controller: 'BlockModalController',
          controllerAs: 'vm',
          templateUrl: 'app/program/modals/blockModal.html',
          size: 'md',
          resolve: {
            block: function() {
              return angular.copy(vm.data);
            },
            programId: function() {
              return vm.programId;
            },
            parentPath: function() {
              return '';
            }
          }
        })
        .result.then(function (block) {
          vm.data = block;
        });
    }
  }
})();