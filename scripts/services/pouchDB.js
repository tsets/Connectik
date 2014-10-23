/* global angular */
(function () {
    'use strict';
    angular.module('connectikApp')
        .factory('PouchDB', function(pouchdb) {
            return pouchdb.create('cardb');
        });
}());