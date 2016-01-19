(function () {

    'use strict';

    /**
     * alexeyAppApp routes.
     *
     */

    angular
        .module('app.core')
        .constant('ROUTES', {
            '/': {
                templateUrl: 'src/main.html',
                controller: 'MainCtrl',
                title: 'Главная'
            },
            '/login': {
                templateUrl: 'src/login/login.html',
                controller: 'LoginCtrl',
                title: 'Вход'
            },
            '/register': {
                templateUrl: 'src/login/register.html',
                controller: 'RegistrationCtrl',
                title: 'Регистрация'
            }
        });

    initUser.$inject = ['$q', 'UsersApi'];

    function initUser($q, UsersApi) {
        return $q(function (resolve) {
            UsersApi.user(function (result) {
                var user = result;
                resolve(user);
            });
        });
    }



})();
