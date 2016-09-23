'use strict';

angular.module('ovCordova.plugins.compass', [])
    .factory('compass', ['$q', function ($q) {
        function watch(options) {
            var watchID,
                defer = $q.defer(),
                mOptions = {frequency: 3000};

            // copy passed in options into
            options = angular.extend(mOptions, options);

            if (angular.isUndefined(navigator.compass) || !angular.isFunction(navigator.compass.watchHeading)) {
                defer.promise.cancel = angular.noop;
                defer.promise.clearWatch = angular.noop;
                defer.reject('Device does not support watchHeading');
            } else {
                defer.promise.cancel = function () {
                    navigator.compass.clearWatch(watchID);
                };

                defer.promise.clearWatch = function (id) {
                    navigator.compass.clearWatch(id || watchID);
                };

                watchID = navigator.compass.watchHeading(function (result) {
                    defer.notify(result);
                }, function (error) {
                    defer.reject(error);
                }, options);

                defer.promise.watchID = watchID;
            }

            return defer.promise;
        }

        function clearWatch(watchID) {
            navigator.compass.clearWatch(watchID);
        }

        return {
            watch: watch,
            clearWatch: clearWatch
        };
    }]);
