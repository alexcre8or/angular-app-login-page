(function () {

  'use strict';

  /**
   * AlexeyApp Back Office app.
   */

// jshint unused:false
  angular
    .module('app.core', [
      // Vendor dependencies.
      'ngCookies',
      'ngSanitize',
      'ngRoute',
      'angularFileUpload'
    ])
    .config(AlexeyAppAppConfig)
    .run(AlexeyAppAppRun);

  AlexeyAppAppConfig.$inject = ['$routeProvider', '$httpProvider', 'ROUTES'];

  /**
   * Configure application.
   *
   * @param $routeProvider
   * @param $httpProvider
   * @param ROUTES
   * @constructor
   */
  function AlexeyAppAppConfig($routeProvider, $httpProvider, ROUTES) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    for (var route in ROUTES) {
      $routeProvider.when(route, ROUTES[route]);
    }

    $routeProvider.otherwise({redirectTo: '/'});
  }

  AlexeyAppAppRun.$inject = ['$rootScope', '$location', '$timeout', '$q', 'AuthStorage', 'LoaderService', 'UsersApi'];

  /**
   * Run application.
   *
   * @param $rootScope
   * @param $location
   * @param $timeout
   * @param AuthStorage
   * @param LoaderService
   * @param UsersApi
   * @constructor
   */
  function AlexeyAppAppRun($rootScope, $location, $timeout, $q, AuthStorage, LoaderService, UsersApi) {
    // Switch off hover effects on scrolling.
    // This technique should speed up page scrolling.
    var body = angular.element('body');
    var timer;

    activate();

    function activate() {
      $rootScope.$on('$routeChangeStart', routeChangeStartCallback);
      $rootScope.$on('$routeChangeSuccess', routeChangeSuccessCallback);
      $rootScope.$on('$routeChangeError', routeChangeErrorCallback);

      angular.element(window).on('scroll', onScroll);
    }

    function routeChangeStartCallback(product, next) {
      LoaderService.showLoader();

      var noUser = angular.isUndefined($rootScope.user) || angular.isUndefined($rootScope.user.id);

      if (noUser) {
        $rootScope.user = UsersApi.user({}, function () {
          $rootScope.userAuthorized = true;
        }, function () {
          // Stop redirection.
          product.preventDefault();

          // Destroy user session.
          AuthStorage.clear();

          $rootScope.userAuthorized = false;

          // Then redirect to the login page.
          if (next.requireAuth) {
            $location.path('/login');
          }
        }).$promise;
      }
    }

    function routeChangeSuccessCallback(product, next) {
      LoaderService.hideLoader();
      $rootScope.title = next.title;
    }

    function routeChangeErrorCallback() {
      LoaderService.hideLoader();
    }

    function onScroll() {
      $timeout.cancel(timer);

      if (!body.hasClass('disable-hover')) {
        body.addClass('disable-hover');
      }

      timer = $timeout(hoverTimeout, 100);
    }

    function hoverTimeout() {
      body.removeClass('disable-hover');
    }
  }

})();
