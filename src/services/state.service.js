(function () {
  'use strict';

  angular
    .module('app.api')
    .factory('StateService', StateService);

  function StateService() {
    var states = [];

    return {
      get:    function (key) {
        if (angular.isDefined(states[key])) {
          return states[key];
        }

        return null;
      },
      set:    function (key, value) {
        states[key] = value;
      },
      delete: function (key) {
        delete states[key];
      }
    };
  }
})();
