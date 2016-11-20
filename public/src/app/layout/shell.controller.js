(function () {
  'use strict';

  angular
    .module('app')
    .controller('ShellController', ShellController);

  ShellController.$inject = ['$scope', '$cookies', '$window'];
  function ShellController($scope, $cookies, $window) {
    var vm = this;
    var mobileView = 992;

    vm.toggle = true;
    vm.ToggleSidebar = toggleSidebar;

    activate();

    angular.element($window).bind('resize', function () {
      if ($window.innerWidth >= mobileView) {
        if (angular.isDefined($cookies.getObject('toggle'))) {
          vm.toggle = !$cookies.getObject('toggle') ? false : true;
        } else {
          vm.toggle = true;
        }
      } else {
        vm.toggle = false;
      }

      $scope.$digest();
    });

    ////////////////

    function activate() {
      vm.toggle = $cookies.getObject('toggle');
    }

    function toggleSidebar() {
      vm.toggle = !vm.toggle;
      $cookies.putObject('toggle', vm.toggle);
    }
  }
})();