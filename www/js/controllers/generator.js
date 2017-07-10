/**
 * Categories controller
 */
(function() {
    angular
        .module('tokenGenerator')

    .controller('GeneratorController', [
        '$scope', '$timeout',
        function($scope, $timeout) {
            'use strict';

            var vm = this;
            vm.otp = "0 0 0 0 0";

            vm.qrImg = ""

            function generateOTP() {
                var totpObj = new TOTP(); // Create an instance of TOTP
                var otp = totpObj.getOTP("jonpecson.io@gmail.com"); // Generate a unique TOTP

                console.log("You OTP is: " + otp);
                var username = "jonpecson";

                vm.otp = otp;
                vm.qrImg = 'https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=200x200&chld=M|0&cht=qr&chl=otpauth://totp/user@host.com%3Fsecret%3D' + otp + '%3Fuser%3D' + username;;

            }

            generateOTP();

            // Timer
            var mytimeout = null; // the current timeoutID
            // actual timer method, counts down every second, stops on zero
            $scope.onTimeout = function() {
                if ($scope.timer === 0) {
                    $scope.$broadcast('timer-stopped', 0);
                    $timeout.cancel(mytimeout);
                    // return;
                    $scope.selectTimer(30);

                    generateOTP();

                }
                $scope.timer--;
                mytimeout = $timeout($scope.onTimeout, 1000);
            };

            // functions to control the timer
            // starts the timer
            $scope.startTimer = function() {
                mytimeout = $timeout($scope.onTimeout, 1000);
                $scope.started = true;
            };

            // stops and resets the current timer
            $scope.stopTimer = function(closingModal) {
                if (closingModal != true) {
                    $scope.$broadcast('timer-stopped', $scope.timer);
                }
                $scope.timer = $scope.timeForTimer;
                $scope.started = false;
                $scope.paused = false;
                $timeout.cancel(mytimeout);
            };
            // pauses the timer
            $scope.pauseTimer = function() {
                $scope.$broadcast('timer-stopped', $scope.timer);
                $scope.started = false;
                $scope.paused = true;
                $timeout.cancel(mytimeout);
            };

            // triggered, when the timer stops, you can do something here, maybe show a visual indicator or vibrate the device
            $scope.$on('timer-stopped', function(event, remaining) {
                if (remaining === 0) {
                    $scope.done = true;
                }
            });
            // UI
            // When you press a timer button this function is called
            $scope.selectTimer = function(val) {
                $scope.timeForTimer = val;
                $scope.timer = val
                $scope.started = false;
                $scope.paused = false;
                $scope.done = false;
            };

            $scope.humanizeDurationTimer = function(input, units) {
                // units is a string with possible values of y, M, w, d, h, m, s, ms
                if (input == 0) {
                    return 0;
                } else {
                    var duration = moment().startOf('day').add(input, units);
                    var format = "";
                    if (duration.hour() > 0) {
                        format += "H[h] ";
                    }
                    if (duration.minute() > 0) {
                        format += "m[m] ";
                    }
                    if (duration.second() > 0) {
                        format += "s[s] ";
                    }
                    return duration.format(format);
                }
            };



            // Automatically starts the timer
            $scope.selectTimer(30);
            $scope.startTimer();
        }
    ]);

})();