(function () {
  'use strict';
  var app = angular.module('app');

  app.controller('subjectsCtr', function ($scope) {
    window.sc = $scope;


    $(document).ready(function () {
      {
          $.getJSON("./assets/json/data2.json",
          function (data) {
            $scope.subjects = data;
          });
      };
    });
  });
})();
