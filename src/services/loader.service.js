(function () {

  'use strict';

  angular
    .module('app.api')
    .factory('LoaderService', LoaderService);

  LoaderService.$inject = ['$rootScope'];

  /**
   * Loader service.
   *
   * @param $rootScope
   * @returns {{isLoading: isLoading, showLoader: showLoader, hideLoader: hideLoader}}
   * @constructor
   */
  function LoaderService($rootScope) {
    var isLoading = false;

    return {
      /**
       * Get current state of global loader.
       */
      isLoading: function () {
        return isLoading;
      },

      /**
       * Show global loader.
       */
      showLoader: function () {
        isLoading = true;
        $rootScope.$broadcast('LoaderStateChanged', isLoading);
      },

      /**
       * Hide global loader.
       */
      hideLoader: function () {
        isLoading = false;
        $rootScope.$broadcast('LoaderStateChanged', isLoading);
      }
    };
  }

})();
