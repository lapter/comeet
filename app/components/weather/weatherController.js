(function () {
    'use strict';

    angular
        .module('comeetApp')
        .controller('weatherController', weatherController);


    weatherController.$inject = ['$scope', 'weatherService', '$interval'];

    function weatherController($scope, weatherService, $interval) {


        var vm = this;
        vm.optimal = { "temp": 21, "humidity": 50 };
        vm.stations = [];
        vm.lastUpdate = {};
        vm.selectedSex = 'M';
        vm.changeOptimal = function () {
             
            if(vm.selectedSex === 'M')
            {
                vm.optimal.temp -= 1;
            }
            else
            vm.optimal.temp += 1;
            getOptimalStations();
        };
        function init() {
            getOptimalStations();
            $interval(getOptimalStations, 5000);

        }

        init();


        function getOptimalStations() {
            weatherService.getOptimalStations(vm.optimal).then(function (data) {
                vm.stations = data;
                vm.lastUpdate = Date();
            });
        }





    }


})();