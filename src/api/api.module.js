(function () {

  /**
   * @file
   *
   * app.api.
   *
   * Web Service API.
   */
  'use strict';

  angular
    .module('app.api', [
      'ngResource',
    ])
      .constant('API_URL', 'http://serverApiUrl');

})();
