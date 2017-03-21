(function() {
    'use strict';

    angular
        .module('app.outcome')
        .controller('OutcomeController', OutcomeController);

    OutcomeController.$inject = ['$scope', '$timeout', 'toaster', '$uibModal', 'Outcome'];

    function OutcomeController($scope, $timeout, toaster, $uibModal, Outcome) {
        var vm = this;
        window.sc = vm;

        // Variables
        vm.program = null;
        vm.programs = [];
        vm.programIndex = [];

        vm.newNode = "";
        vm.nodes = [];
        vm.tree = [];
        vm.dragEnabled = false;

        // Methods
        vm.Toggle = toggle;
        vm.Remove = remove;
        vm.AddNode = addNode;
        vm.AddSubNode = addSubNode;
        vm.EditNode = editNode;
        vm.ChooseFile = chooseFile;
        vm.UpdateNode = updateNode;
        vm.Save = save;
        vm.GetTreeView = vm.getTreeView;

        activate();

        ////////////////

        function activate() {
            Outcome.GetAllPrograms().then(function(programs) {
                for (var i = 0; i < programs.length; i++) {
                    vm.programs.push(programs[i]);
                }
            }).catch(function(err) {
                console.log(err);
            });
        }

        // Tree events
        function toggle(node) {
            node.toggle();
        }

        function remove(node) {
            var outcome = node.$nodeScope.$modelValue;

            Outcome.DeleteNode(outcome._id).then(function(res) {
                if (res) {
                    node.remove();
                    toaster.pop('success', "Success", "Remove outcome successfully!!!");
                } else {
                    toaster.pop('error', 'Failed', "Can't remove node. Please try again!!!");
                }
            });
        }

        function addNode() {
            $uibModal.open({
                controller: 'OutcomeModalController',
                controllerAs: 'vm',
                templateUrl: 'app/learningOutcome/outcomeModal.html',
                size: 'lg',
                resolve: {
                    outcome: function() {
                        return null;
                    }
                }
            }).result.then(function(outcome) {
                if (vm.program.outcome) {
                    outcome.path = "," + vm.program.outcome + "," + outcome._id + ",";
                    vm.UpdateNode(outcome);
                }

                vm.tree.push({
                    id: outcome._id,
                    title: outcome.title,
                    majors: outcome.majors,
                    path: outcome.path,
                    nodes: []
                });

                toaster.pop('success', "Success", "Add new learning outcome!!!");
            });
        }

        function addSubNode(tree) {
            $uibModal.open({
                controller: 'OutcomeModalController',
                controllerAs: 'vm',
                templateUrl: 'app/learningOutcome/outcomeModal.html',
                size: 'lg',
                resolve: {
                    outcome: function() {
                        return null;
                    }
                }
            }).result.then(function(outcome) {
                var node = tree.$nodeScope.$modelValue;
                if (node.path) {
                    outcome.path = node.path + outcome._id + ",";
                    vm.UpdateNode(outcome);
                }

                node.nodes.push({
                    id: outcome._id,
                    title: outcome.title,
                    majors: outcome.majors,
                    code: outcome.code,
                    path: outcome.path,
                    nodes: []
                });

                toaster.pop('success', "Success", "Add new learning outcome!!!");
            });
        }

        function editNode(node) {
            var item = node.$nodeScope.$modelValue;
            $uibModal.open({
                    controller: 'OutcomeModalController',
                    controllerAs: 'vm',
                    templateUrl: 'app/learningOutcome/outcomeModal.html',
                    size: 'lg',
                    resolve: {
                        outcome: function() {
                            return angular.copy(item);
                        }
                    }
                })
                .result.then(function(outcome) {
                    item.title = outcome.title;
                    item.majors = outcome.majors;

                    $scope.$evalAsync();
                });
        }

        function updateNode(outcome) {
            Outcome.UpdateNode(outcome).then(function(res) {
                console.log("Update node successfully.");
            });
        }
        // End tree events

        // Read excel file
        function chooseFile() {
            $('#jsExcelFile').click();
        }

        $scope.read = function read(workbook) {
            vm.tree = Outcome.ReadExcelFile(workbook);
            $scope.$evalAsync();
        };

        $scope.error = function error(e) {
            console.log(e);
        };
        // End read excel file

        function save() {
            if (vm.program !== null && vm.tree.length > 0) {
                var rootPath = "," + vm.program._id + ",";
                vm.tree = Outcome.ToMaterializePath(vm.tree, rootPath);

                $timeout(function() {
                    console.log("RUN");
                    Outcome.UpdateMaterialPath();
                    toaster.pop('success', "Success", "Update program successfully!!!");
                }, 1000);
            } else {
                toaster.pop('error', "Failed", "Information missed!!!");
            }
        }

        function getTreeView() {
            // Outcome.GetOutcomeTree(vm.program._id).then(function(res) {

            // });
        }
    }
})();