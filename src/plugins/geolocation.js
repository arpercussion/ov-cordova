'use strict';

angular.module('ovCordova.plugins.geolocation', [])
    .factory('geolocation', ['$q', function ($q) {
        function watch(options) {
            var watchID,
                defer = $q.defer(),
                mOptions = {timeout: 30000};

            // copy passed in options into
            options = angular.extend(mOptions, options);

            if (angular.isUndefined(navigator.geolocation) || !angular.isFunction(navigator.geolocation.watchPosition)) {
                defer.promise.cancel = angular.noop;
                defer.promise.clearWatch = angular.noop;
                defer.reject('Device do not support watchPosition');
            } else {
                defer.promise.cancel = function () {
                    navigator.geolocation.clearWatch(watchID);
                };

                defer.promise.clearWatch = function (id) {
                    navigator.geolocation.clearWatch(id || watchID);
                };

                watchID = navigator.geolocation.watchPosition(function (result) {
                    defer.notify(result);
                }, function (error) {
                    defer.reject(error);
                }, options);

                defer.promise.watchID = watchID;
            }

            return defer.promise;
        }

        function clearWatch(watchID) {
            navigator.geolocation.clearWatch(watchID);
        }

        return {
            watch: watch,
            clearWatch: clearWatch
        };
    }]);
