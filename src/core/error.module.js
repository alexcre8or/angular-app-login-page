(function () {

  'use strict';

  angular
    .module('app.core')
    .config(['$httpProvider', function ($httpProvider) {
      $httpProvider.interceptors.push('ErrorInterceptor');
    }])
    .factory('ErrorInterceptor', ['$q', '$injector', 'LoaderService', ErrorInterceptor]);

  function ErrorInterceptor($q, $injector, LoaderService) {
    return {
      responseError: function (rejection) {
        if (!rejection.data) {
          //LoaderService.showOffline();
        } else if (angular.isDefined(rejection.data.reason) && rejection.data.reason) {
          var toastr = $injector.get('toastr');
          toastr.error(rejection.data.reason);
        }

        return $q.reject(rejection);
      }
    };
  }

})();
