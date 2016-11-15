(function () {
    'use strict';
    var app = angular.module('app');

    app.controller('trainingCtr', function ($scope) {
        window.sc = $scope;

        $scope.chooseFile = function chooseFile() {
            $('#fileLO').click();
        }

        $scope.faculties = ["Công Nghệ Thông Tin", "Toán - Toán Tin", "Sinh học - Công nghệ sinh học", "Vật lý", "Hóa học", "Môi trường"];

        $scope.trnPrograms = {
            "Faculty": "Công Nghệ Thông Tin",
            "Programs": [
                    "Chính Quy",
                    "Cao Đẳng",
                    "Chất Lượng Cao"
                ]
        };

        $scope.onFacultyChange = function onFacultyChange() {
            $scope.programs = $scope.trnPrograms.Programs;
        }

        $('#container1').jstree({
            'core': {
                'data': [
                    {
                        "text": "Công nghệ thông tin",
                        "state": { "opened": true },
                        "children": [
                            {
                                "text": "Chính Quy",
                                "state": { "opened": true },
                                "children":[
                                    { 
                                        "text": "Nhập môn lập trình",
                                        "state": { "selected": true },
                                    },
                                    { 
                                        "text": "Nhập môn CNTT",
                                    }
                                ]
                            },
                            
                        ]
                    }
                ]
            }
        });

    });
})();
