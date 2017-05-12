(function() {
    'use strict';

    angular
        .module('app.core')
        .factory('Dialog', Dialog);

    Dialog.inject = [];

    function Dialog() {
        var service = {
            Confirm: confirm,
            Error: error,
            Success: success,
            Warning: warning
        };

        return service;

        ////////////////
        function confirm(title, text, confirmText, callback) {
            swal({
                    title: title,
                    text: text,
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: confirmText,
                    cancelButtonText: 'Hủy',
                    showLoaderOnConfirm: true,
                    closeOnConfirm: false,
                },
                function(isConfirm) {
                    callback(isConfirm);
                });
        };

        function success(title, text) {
            swal(title, text, 'success');
        };

        function error(title, text) {
            swal(title, text, 'error');
        };

        function warning(title, text, confirmText, callback) {
            swal({
                    title: title,
                    text: text,
                    type: "warning",
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: confirmText,
                    showLoaderOnConfirm: true,
                    closeOnConfirm: false,
                },
                function(isConfirm) {
                    callback(isConfirm);
                });
        }
    }
})();