(function () {
	'use strict';
	var app = angular.module('app');
	var server = "../api";

	app.controller('sidenavCtr', function($scope, $state){
		window.sb = $scope;

		$scope.active = 0;
		$scope.$state = $state;
		
		$scope.changeActive = function changeActive(id) {
			$scope.active = id;
		}
	});
})();