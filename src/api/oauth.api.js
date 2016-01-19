(function () {
  /**
   * @file
   * AuthApi.
   * Implements Authentication API.
   */
  'use strict';
  angular
    .module('app.api')
    .config(['$httpProvider', function ($httpProvider) {
      $httpProvider.interceptors.push('OAuthInterceptor');
    }])
    .factory('OAuthApi', ['$resource', 'API_URL_V2', OAuthApi])
    .factory('OAuthInterceptor', ['$q', 'API_URL_V2', 'OAuthStorage', 'moment', OAuthInterceptor])
    .factory('OAuthStorage', OAuthStorage);

  function OAuthApi($resource, API_URL_V2) {
    return $resource(API_URL_V2 + '/v2/oauth/access_token',
        { grant_type: '@grant_type',username: '@username',password: '@password',clientId: '@clientId', clientSecret: '@clientSecret'}, {
      /**
       * Open session for current user.
       * POST /login
       */
      login: {
        url: API_URL_V2 + '/v2/oauth/access_token',
        method: 'POST',
        params: {
          grant_type: "password",
          username: '@username',
          password: '@password',
          client_id: '###',
          client_secret: '###'
        }
      },
      /**
       * Close current user's session.
       *
       * POST /logout
       */
      logout: {
        method: 'DELETE',
        oauth:   true
      }
    });
  }

  function OAuthInterceptor($q, API_URL_V2, OAuthStorage) {
    return {
      request: function (config) {
        // Check if we should send an authenticated request.
        if (angular.isDefined(config.oauth) && config.oauth) {
          var key = OAuthStorage.fetchAuthKey();
          if (key) {
            config.headers['Authorization'] = key;
          }
        }
        return config || $q.when(config);
      }
    };
  }

  function OAuthStorage() {
    var storage = window.sessionStorage;
    return {
      /**
       * Store authentication data.
       *
       * @param {int} id
       * @param {string} authKey
       */
      store: function (auth) {
        storage.access_token = auth.access_token;
        storage.expires_in = auth.expires_in;
        storage.scope = auth.scope;
        storage.refresh_token = auth.refresh_token;
        storage.token_type = auth.token_type;
      },

      /**
       * Get current user authentication key.
       *
       * @returns {*}
       */
      fetchAuthKey: function () {
        if (angular.isDefined(storage.access_token)) {
          return storage.token_type +' '+ storage.access_token;
        }
        return null;
      },

      /**
       * Clear authentication storage.
       */
      clear: function () {
        storage.removeItem('access_token');
        storage.removeItem('expires_in');
        storage.removeItem('scope');
        storage.removeItem('refresh_token');
        storage.removeItem('token_type');
      }
    };
  }

})();
