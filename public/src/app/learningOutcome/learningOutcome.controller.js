(function () {
    'use strict';

    angular
        .module('app.outcome')
        .controller('OutcomeController', OutcomeController);

    OutcomeController.$inject = ['$http', '$timeout', '$scope', 'toaster'];
    function OutcomeController($http, $timeout, $scope, toaster) {
        var vm = this;
        window.sc = vm;

        // Variables
        vm.program = "";
        vm.newNode = "";
        vm.currentNode = "";
        vm.nodes = [];
        vm.dragEnabled = false;

        // Methods
        vm.toggle = toggle;
        vm.addSubNode = addSubNode;
        vm.remove = remove;


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

            eachRecursive(vm.treeData);
        }

        function eachRecursive(tree) {
            for (var key in tree) {
                if (typeof tree[key] == "object" && tree[key] !== null) {
                    var node = {
                        id: tree[key].id,
                        title: tree[key].title
                    }
                    vm.nodes.push(node);
                    eachRecursive(tree[key].nodes);
                }
            }
        }

        function toggle(node) {
            node.toggle();
        }

        function addSubNode(tree) {
            var node = tree.$nodeScope.$modelValue;
            node.nodes.push({
                id: node.id + "0",
                title: vm.newNode,
                nodes: []
            });
            toaster.pop('success', "Success", "Add new learning outcome!!!");
        }

        function remove(node) {
            node.remove();
        }
    }
})();