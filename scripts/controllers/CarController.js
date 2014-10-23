/* global angular */
(function () {
    'use strict';

    angular.module('connectikApp')
        .controller('CarCtrl', function ($scope, PouchDB, $routeParams, $location, googleMaps, $filter) {
            var coords = {
                    latitude: 40.1451,
                    longitude: -99.6680
                };

            $scope.dateToday = $filter('date')(new Date, 'yyyy-MM-dd');

            // RegEx for Registration Number
            $scope.regNumRegex = /[\u0410-\u042C]{1,2}\s[0-9]{4}\s[\u0410-\u042C]{1,2}/;

            // File Uploader (required)
            $scope.readMethod = 'readAsDataURL';
            // Map Options
            $scope.map = googleMaps;

            // Marker initial options
            $scope.marker = {
                id: 0,
                coords: coords,
                options: { draggable: true },
                events: {
                    dragend: function (marker) {
                        $scope.car.location.latitude = marker.getPosition().lat();
                        $scope.car.location.longitude = marker.getPosition().lng();
                    }
                }
            };

            // Reading image
            $scope.onReaded = function(e){
                $scope.car.image = e.target.result;
            };

            $scope.save = function() {
                var promise;
                if ($scope.car._rev) {
                    promise = PouchDB.put({
                        brand: $scope.car.brand,
                        model: $scope.car.model,
                        inStock: $scope.car.inStock,
                        date: $scope.car.date,
                        image: $scope.car.image,
                        location: $scope.car.location
                    }, $scope.car.regNumber, $scope.car._rev);
                } else {
                    promise = PouchDB.put({
                        brand: $scope.car.brand,
                        model: $scope.car.model,
                        inStock: $scope.car.inStock,
                        date: $scope.car.date,
                        image: $scope.car.image,
                        location: $scope.car.location
                    }, $scope.car.regNumber);
                }

                promise
                    .then(function() {
                        $location.path('/');
                    })
                    .catch(function(response) {
                        $scope.errorMsg = ['Save failed. ', response].join('');
                    })
            };

            // NOTE: It's always a good idea to confirm deleting
            $scope.deleteCar = function() {
                PouchDB
                    .remove($scope.car)
                    .then(function() {
                        $location.path('/')
                    })
                    .catch(function(response) {
                        $scope.errorMsg = response;
                    });
            };

            // get car details if regNumber provided
            if ($routeParams.regNumber) {
                PouchDB.get($routeParams.regNumber)
                    .then(function(response) {
                        $scope.car = response;
                        $scope.car.regNumber = response._id;
                        $scope.marker.coords = response.location;

                    })
                    .catch(function(response) {
                        $scope.errorMsg = ['Car details not found. ', response].join('');
                    });
            } else {
                $scope.car = {
                    _id: '',
                    brand: '',
                    model: '',
                    regNumber: '',
                    inStock: 0,
                    date: '',
                    image: '',
                    location: coords
                };
            }
        });
}());