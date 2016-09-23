'use strict';

angular.module('ovCordova.plugins.accelerometer', [])
    .factory('accelerometer', ['$q', function ($q) {
        function watch(options) {
            var watchID,
                defer = $q.defer(),
                mOptions = {frequency: 3000};

            // copy passed in options into
            options = angular.extend(mOptions, options);

            if (angular.isUndefined(navigator.accelerometer) || !angular.isFunction(navigator.accelerometer.watchAcceleration)) {
                defer.promise.cancel = angular.noop;
                defer.promise.clearWatch = angular.noop;
                defer.reject('Device do not support watchAcceleration');
            } else {
                defer.promise.cancel = function () {
                    navigator.accelerometer.clearWatch(watchID);
                };

                defer.promise.clearWatch = function (id) {
                    navigator.accelerometer.clearWatch(id || watchID);
                };

                watchID = navigator.accelerometer.watchAcceleration(function (result) {
                    defer.notify(result);
                }, function (error) {
                    defer.reject(error);
                }, options);

                defer.promise.watchID = watchID;
            }

            return defer.promise;
        }

        function clearWatch(watchID) {
            navigator.accelerometer.clearWatch(watchID);
        }

        return {
            watch: watch,
            clearWatch: clearWatch
        };
    }]);
