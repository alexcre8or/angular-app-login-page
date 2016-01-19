(function () {

  'use strict';

  angular
    .module('app.core')
    .controller('RegistrationCtrl', RegistrationCtrl);

  RegistrationCtrl.$inject = ['$scope', '$rootScope', '$location',
    'UsersApi', 'OAuthStorage', 'MerchantService',
    'toastr', 'CryptoJS'];

  function RegistrationCtrl($scope, $rootScope, $location, UsersApi, OAuthStorage, MerchantService, toastr, CryptoJS) {
    $scope.error = {
      show: false,
      message: ''
    };

    $scope.email = '';
    $scope.password = '';
    $scope.captcha = {};
    $scope.hasError = hasError;
    $scope.register = register;

    activate();

    function activate() {
      getCaptcha();
    }

    function hasError(element) {
      return element.$invalid && !element.$pristine;
    }

    function register() {
      var passwordHash = CryptoJS.MD5($scope.password).toString();

      UsersApi.register({
          email: $scope.email,
          pwd_md5: passwordHash,
          challenge: { key: $scope.captcha.key, answer: $scope.captcha.answer }
        },
        onSuccessfulRegistration,
        onRegistrationFailed);
    }

    function onSuccessfulRegistration(auth) {
      OAuthStorage.store(auth);
      $location.path('/products');
      MerchantService.set({id: 0, kind: 0});

      $rootScope.$broadcast('UserLoggedIn');

      toastr.success('Поздравляем! Вы успешно зарегистрировались.');
    }

    function onRegistrationFailed(response) {
      getCaptcha();
    }

    function getCaptcha() {
      UsersApi.captcha({}, function (data) {
        $scope.captcha = data;
      });
    }

  }
})();
