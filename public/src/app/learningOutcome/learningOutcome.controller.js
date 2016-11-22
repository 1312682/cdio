(function() {
    'use strict';

    angular
        .module('app.outcome')
        .controller('OutcomeController', OutcomeController);

    OutcomeController.$inject = ['$http', '$timeout', '$scope'];
    function OutcomeController($http, $timeout, $scope) {
        var vm = this;

        vm.program = "";
        vm.newNode = {};
        vm.dragEnabled = false;

        vm.treeOptions = {
            toggle: function(collapsed, sourceNodeScope) {
                return !collapsed;
            }
        }

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
        }

        vm.toggle = function toggle(node) {
            node.toggle();
        }

        vm.collapsed = function collapse() {
            $scope.$broadcast('angular-ui-tree:collapse-all');
        }
    }
})();