(function(){

'use strict';

angular.module('ovCordova', [
  'ovCordova.plugins'
]);

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
                defer.reject('Device does not support watchAcceleration');
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
                defer.reject('Device does not support watchPosition');
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

'use strict';

angular.module('ovCordova.plugins', [
  'ovCordova.plugins.accelerometer',
  'ovCordova.plugins.geolocation',
  'ovCordova.plugins.compass'
]);


})();
