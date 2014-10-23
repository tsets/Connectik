/* global angular */
(function() {
    'use strict';

    /**
     * @ngdoc overview
     * @name connectikApp
     * @description
     * # connectikApp
     *
     * Main module of the application.
     */
    angular
        .module('connectikApp', [
            'ngRoute',
            'pouchdb',
            'ngFileReader',
            'google-maps'.ns()
        ])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/list.html',
                    controller: 'ListCtrl'
                })
                .when('/car/:regNumber?', {
                    templateUrl: 'views/car.html',
                    controller: 'CarCtrl'
                })
                .when('/list', {
                    templateUrl: 'views/list.html',
                    controller: 'ListCtrl'
                })
                .when('/map', {
                    templateUrl: 'views/map.html',
                    controller: 'MapCtrl'
                })
                .otherwise({
                    redirectTo: '/list'
                });
        });

    angular.element(document.documentElement).removeClass('no-js');
}());

