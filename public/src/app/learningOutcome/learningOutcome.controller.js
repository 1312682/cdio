(function () {
    'use strict';

    angular
        .module('app.outcome')
        .controller('OutcomeController', OutcomeController);

    OutcomeController.$inject = ['$http', '$timeout', 'toaster', '$uibModal', 'Outcome'];
    function OutcomeController($http, $timeout, toaster, $uibModal, Outcome) {
        var vm = this;
        window.sc = vm;

        // Variables
        vm.program = "";
        vm.newNode = "";
        vm.currentNode = "";
        vm.nodes = [];
        vm.dragEnabled = false;

        // Methods
        vm.Toggle = toggle;
        vm.Remove = remove;
        vm.AddSubNode = addSubNode;

        activate();

        ////////////////

        function activate() {
            vm.programs = ["CNTT - Hệ Chính Quy", "CNTT - Hệ Cao Đẳng", "CNTT - Hoàn Chỉnh"];
            vm.treeData = [
                {
                    'id': 1,
                    'title': 'Node 1',
                    'nodes': [
                        {
                            'id': 11,
                            'title': 'Node 1.1',
                            'nodes': []
                        },
                        {
                            'id': 12,
                            'title': 'Node 1.2',
                            'nodes': [
                                {
                                    'id': 121,
                                    'title': 'Node 1.2.1',
                                    'nodes': []
                                }
                            ]
                        }
                    ]
                },
                {
                    'id': '2',
                    'title': 'Node 2',
                    'nodes': []
                }
            ];

            vm.nodes = Outcome.toMaterializePath(vm.treeData, vm.nodes, "");
            console.log(vm.nodes);
        }

        function toggle(node) {
            node.toggle();
        }

        function remove(node) {
            node.remove();
        }

        function addSubNode(tree) {
            $uibModal.open({
                controller: 'AddOutcomeController',
                controllerAs: 'vm',
                templateUrl: 'app/learningOutcome/addOutcome.html',
                size: 'lg'
            }).result.then(function (outcome) {
                var node = tree.$nodeScope.$modelValue;
                node.nodes.push({
                    id: outcome._id,
                    title: outcome.name,
                    majors: outcome.majors,
                    nodes: []
                });
                toaster.pop('success', "Success", "Add new learning outcome!!!");
            })

        }
    }
})();