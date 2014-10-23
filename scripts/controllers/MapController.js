/**
 * Created by ttsvetko on 10/21/14.
 */
(function() {
    'use strict';

    angular.module('connectikApp')
        .controller('MapCtrl', ['$scope', 'googleMaps', 'PouchDB', 'GoogleMapApi'.ns(), '$location' , function ($scope, googleMaps, PouchDB, GoogleMapApi, $location) {
            $scope.map = googleMaps;
            $scope.markers = [];

            PouchDB
                .allDocs({include_docs: true})
                .then(function(response) {
                    GoogleMapApi.then(function() {
                        $scope.markers = response.rows.map(function(car) {
                            return {
                                id: car.doc._id,
                                coords: car.doc.location,
                                options: { draggable: false },
                                showInfo: function(map, eventType, carObj) {
                                    debugger;
                                    $location.path(['/car/', carObj.id].join(''));
                                }
                            };
                        });
                    });
                })
                .catch(function(response) {
                    $scope.errorMsg = ['Car details not found. ', response].join('');
                });
        }])
}());