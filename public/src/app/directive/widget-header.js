(function () {
    /**
     * Widget Header Directive
     */

    angular
        .module('app')
        .directive('widgetHeader', rdWidgetTitle);

    function rdWidgetTitle() {
        var directive = {
            requires: '^rdWidget',
            scope: {
                title: '@',
                icon: '@'
            },
            transclude: true,
            templateUrl: 'app/directive/widgetHeader.html',
            restrict: 'E'
        };
        return directive;
    };
})();