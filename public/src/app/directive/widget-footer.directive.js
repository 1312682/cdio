(function () {
    /**
     * Widget Footer Directive
     */

    angular
        .module('app')
        .directive('widgetFooter', rdWidgetFooter);

    function rdWidgetFooter() {
        var directive = {
            requires: '^rdWidget',
            transclude: true,
            template: '<div class="widget-footer" ng-transclude></div>',
            restrict: 'E'
        };
        return directive;
    };
})();