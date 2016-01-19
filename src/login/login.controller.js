(function () {

  'use strict';

  angular
    .module('app.core')
    .controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$scope', '$rootScope', '$location',
    'LoaderService', 'CryptoJS', 'OAuthApi', 'OAuthStorage'];

  function LoginCtrl($scope, $rootScope, $location, LoaderService, OAuthApi, OAuthStorage) {
    $scope.email = '';
    $scope.password = '';
    $scope.hasError = hasError;
    $scope.login = login;

    activate();

    function activate() {
      $rootScope.$broadcast('UserLoggedOut');
      LoaderService.hideLoader();
      AuthStorage.clear();
      OAuthApi.logout({}, function () {
        OAuthStorage.clear();
      });
    }

    function login() {
      LoaderService.showLoader();
      var passwordHash = CryptoJS.MD5($scope.password).toString();
      OAuthApi.login({
        username: $scope.email,
        password: passwordHash
      }, function (response) {
        OAuthStorage.store(response);
        LoaderService.hideLoader();
        $location.path('/products');
      }, function () {
        LoaderService.hideLoader();
      });
    }

    function hasError(element) {
      return element.$invalid && !element.$pristine;
    }
  }
})();
