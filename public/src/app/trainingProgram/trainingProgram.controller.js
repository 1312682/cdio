(function () {
    'use strict';

    angular
        .module('app.training')
        .controller('TrainingController', TrainingController);

    TrainingController.$inject = ['$http', '$uibModal', '$log', '$document', 'toaster'];
    function TrainingController($http, $uibModal, $log, $document, toaster) {
        var vm = this;

        activate();

        ////////////////
        vm.programs = [];

        vm.faculties = ["Công nghệ thông tin", "Sinh - Công nghệ sinh", "Toán - Toán tin", "Vật lí", "Hóa học", "Môi trường"];
        vm.types = ["Chính quy", "Cao Đẳng", "Chất Lượng Cao"];
        function activate() { }

        vm.animationsEnabled = true;

        vm.open = function (size, parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: vm.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: 'vm',
                size: size,
                appendTo: parentElem,
                resolve: {

                }
            });

            modalInstance.result.then(function () {

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
                toaster.pop('success', "Success", "Added new training program!!!");
            });
        };
    }
})();

angular.module('app.training').controller('ModalInstanceCtrl', function ($uibModalInstance) {
    var vm = this;
    vm.faculties = ["Công nghệ thông tin", "Sinh - Công nghệ sinh", "Toán - Toán tin", "Vật lí", "Hóa học", "Môi trường"];
    vm.types = ["Chính quy", "Cao Đẳng", "Chất Lượng Cao"];
    vm.add = function () {
        $uibModalInstance.close();

    };

    vm.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});


