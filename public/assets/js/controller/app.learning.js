(function () {
    'use strict';
    var app = angular.module('app');

    app.controller('learningCtr', function ($scope) {
        window.sc = $scope;

        $scope.chooseFile = function chooseFile() {
            $('#fileLO').click();
        }


        $('#container').jstree({
            'core': {
                'data': [
                    {
                        "text": "Root node",
                        "state": { "opened": true },
                        "children": [
                            {
                                "text": "Child node 1",
                                "state": { "selected": true },
                                "icon": "glyphicon glyphicon-flash"
                            },
                            { "text": "Child node 2", "state": { "disabled": true } }
                        ]
                    }
                ]
            }
        });
    });
})();
