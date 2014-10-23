/**
 * Created by ttsvetko on 10/21/14.
 */
(function() {
    'use strict';

    angular.module('connectikApp')
        .controller('ListCtrl', function ($scope, PouchDB) {
            $scope.cars = [];
            PouchDB.allDocs({include_docs: true})
                .then(function(data) {
                    $scope.cars = data.rows;
                })
                .catch(function(response) {
                    $scope.errorMsg = ['Fetchig car list failed. ', response].join('');
                })
        });
}());