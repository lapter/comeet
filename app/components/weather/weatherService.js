(function () {
    'use strict';

    angular
        .module('comeetApp')
        .factory('weatherService', weatherService);

    weatherService.$inject = ['$http','BOX_END_POINT'];

    function weatherService($http, BOX_END_POINT) {
        var service = {
            getOptimalStations: getOptimalStations
        };

        return service;

       
        function getOptimalStations(optimal) {
            return $http.get(BOX_END_POINT)
                .then(function (response) {
                    return orderStations(response.data, optimal);
                }, function (error) {
                    console.log("Error retrieving data: " + error);
                });
        }


        function orderStations(data, optimal) {

            var stations = _.map(data.list, function (station) {
                return {
                    "name": station.name,
                    "temp": station.main.temp,
                    "humidity": station.main.humidity,
                    "delta": (Math.abs(station.main.temp - optimal.temp) + Math.abs(station.main.humidity - optimal.humidity))
                }
            });

            var orderedStations = _.sortBy(stations, function (station) {
                return station.delta;

            });

            return orderedStations;
        }





    }
})();