(function () {

    'use strict';

    angular
        .module('app', [
            // Custom dependencies.
            'app.core',
            'app.components',
            'app.api',
            // 3-rd party depkendencies.
            'toastr',
            'froala'
        ]);

})();
