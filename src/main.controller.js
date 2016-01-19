(function () {

  'use strict';

  angular
    .module('app.core')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', '$location', '$rootScope', 'LoaderService'];

  function MainCtrl($scope, $location, $rootScope, LoaderService) {
    activate();

    function activate() {
        LoaderService.showLoader();
        $rootScope.user.then(function () {
            $location.path('/products');
        }, function () {
          $location.path('/login');
        }).finally(function() {
          LoaderService.hideLoader();
        });
    }
  }
})();
