(function () {
    'use strict';
    var app = angular.module('app');

    app.controller('learningCtr', function ($scope) {
        window.sc = $scope;

        /* Chọn chương trình đào tạo */
        $scope.outcome = {};

        $scope.programs = ["Công Nghệ Thông Tin - Chính qui", "Công Nghệ Thông Tin - Cao đẳng"];

        /* Xử lí nút chọn tệp */
        $scope.chooseFile = function chooseFile() {
            $('#fileLO').click();
        }

        $scope.searchOutcomeTree = function searchOutcomeTree() {
            $('#container').jstree('search', $scope.search);
        }

        /* Hiển thị cây thư mục */
        $scope.reloadOutcomeTree = function reloadOutcomeTree() {
            $scope.data = [{
                "text": $scope.outcome.program,
                "children": []
            }];

            $('#container').jstree({
                "core": {
                    "themes" : { "stripes" : true },
                    "data": $scope.data,
                    "check_callback" : true
                },
                "types": {
                    "#": {
                        "max_children": 6,
                        "max_depth": 4,
                        "valid_children": ["root"]
                    },
                    "root": {
                        "valid_children": ["topic"]
                    },
                    "topic": {
                        "valid_children": ["block"]
                    },
                    "block": {
                        "valid_children": ["outcome"]
                    },
                    "outcome": {
                        "icon": "jstree-node",
                        "valid_children": []
                    } 
                },
                "contextmenu": {
                    "items": function($node) {
                        var tree = $("#container").jstree(true);
                        return {
                            "Create": {
                                "separator_before": false,
                                "separator_after": false,
                                "label": "Tạo mới",
                                "action": function (obj) { 
                                    $node = tree.create_node($node);
                                    tree.edit($node);
                                }
                            },
                            "Rename": {
                                "separator_before": false,
                                "separator_after": false,
                                "label": "Đổi tên",
                                "action": function (obj) { 
                                    tree.edit($node);
                                }
                            },                         
                            "Remove": {
                                "separator_before": false,
                                "separator_after": false,
                                "label": "Xóa",
                                "action": function (obj) { 
                                    tree.delete_node($node);
                                }
                            }
                        };
                    }
                },
                "search": {
                    "case_insensitive": true,
                    "show_only_matches" : true
                }, 
                "plugins": ["contextmenu", "dnd", "search", "state", "types", "wholerow"]
            });
        }
    });
})();
