(function () {
  'use strict';
  var app = angular.module('app');

  app.controller('trainingCtr', function ($scope) {
    window.sc = $scope;


    $(document).ready(function () {
      {
        $.getJSON("./assets/json/data1.json",
          function (data) {
            $scope.trnPrograms = data;
          });
        $.getJSON("./assets/json/data2.json",
          function (data) {
            $scope.subjects = data;
          });
      };
    });

    $scope.faculties = ["Công Nghệ Thông Tin", "Toán - Toán Tin", "Sinh học - Công nghệ sinh học", "Vật lý", "Hóa học", "Môi trường"];
    $scope.types = ["Chính quy", "Cao đẳng", "Chất lượng cao"];

    $scope.onFacultyChange = function onFacultyChange() {
      for (var k in $scope.trnPrograms)
      {
        if ($scope.trnPrograms[k].Faculty == $scope.curFaculty){
          $scope.programs = $scope.trnPrograms[k].Programs;
          break;
        }
      }
      
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
            "children": [
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
