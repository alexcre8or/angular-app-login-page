(function () {
  /**
   * @file
   * UsersApi.
   * Implements Users API.
   */
  'use strict';

  angular
    .module('app.api')
    .factory('UsersApi', UsersApi);

  UsersApi.$inject = ['$resource', 'API_URL_V2'];

  /**
   * Users service.
   *
   * @param $resource
   * @param API_URL
   * @returns {*}
   * @constructor
   */
  function UsersApi($resource, API_URL_V2) {
    return $resource(API_URL_V2 + '/v2/user/:op/:arg', {op: '@op', arg: '@arg'}, {

      /**
       * Returns current user profile. Available only for current user.
       *
       * GET /v2/user/self
       * Permission: User
       */
      user: {
        method: 'GET',
        params: {
          op: 'self'
        },
        oauth: true
      },
      /**
       * Registers new user on the service.
       *
       * POST /user
       */
      register: {
        method: 'POST'
      },
      /**
       * Updates user account information
       *
       * PUT /v2/user/self
       */
      update: {
        method: 'PUT',
        params: {
          op: 'self'
        },
        oauth: true,
      },

      /**
       * Returns list of all users.
       *
       * GET /users
       * Permission: Admin
       */
      all: {
        url: API_URL_V2 + '/v2/users',
        method: 'GET',
        isArray: true,
        oauth: true
      },

      /**
       * Returns current user profile. Available only for current user.
       *
       * GET /v2/user/self
       * Permission: Admin
       */
      userById: {
        method: 'GET',
        params: {
          op: '@id'
        },
        oauth: true
      },

      /**
       * Exports users emails as .csv contents
       *
       * GET /v2/users/export/csv
       * Permission: Admin
       */
      csv: {
        method: 'GET',
        url: API_URL_V2 + '/v2/users/export/csv',
        oauth: true
      },

      /**
       * Lists user's contacts.
       *
       * GET /user/contacts
       */
      contacts: {
        method: 'GET',
        params: {
          op: 'contacts'
        },
        isArray: true,
        auth: true
      },

      /**
       * Adds user's contact.
       *
       * POST /user/contact
       */
      createContact: {
        method: 'POST',
        params: {
          op: 'contact'
        },
        auth: true
      },
      /**
       * Deletes user's contact.
       *
       * DELETE /user/:id/contact
       */
      deleteContact: {
        method: 'DELETE',
        url: API_URL_V2 + '/user/contact/:id',
        params: {
          id: '@id'
        },
        auth: true
      },
      /**
       * Updates user's contact information.
       *
       * PUT /user/:id/contact
       */
      updateContact: {
        method: 'PUT',
        url: API_URL_V2 + '/user/contact/:id',
        params: {
          id: '@id'
        },
        auth: true
      },

      /**
       * Change user password.
       *
       * PUT /v2/user/password
       */
      changePassword: {
        method: 'PUT',
        params: {
          op: 'password'
        },
        oauth: true
      },
      /**
       * Recovers user password.
       *
       * POST /v2/user/password/recover?email=[string]
       */
      recoverPassword: {
        method: 'PUT',
        params: {
          op: 'password',
          arg: 'recover'
        }
      },
      /**
       * Get captcha challenge.
       */
      captcha: {
        method: 'GET',
        url: API_URL_V2 + '/v2/challenge'
      }

    });
  }

})();
