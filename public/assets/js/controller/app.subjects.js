(function () {
  'use strict';
  var app = angular.module('app');

  app.controller('subjectsCtr', function ($scope, $http) {
    window.sc = $scope;
  });
});
