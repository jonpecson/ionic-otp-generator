/**
 * Login controller
 */
(function() {
    angular
        .module('tokenGenerator')

    .controller('SigninController', [
        '$ionicSideMenuDelegate',
        '$state',
        '$ionicHistory',
        function($ionicSideMenuDelegate, $state, $ionicHistory) {
            'use strict';

            $ionicSideMenuDelegate.canDragContent(false);

            var vm = this;

            vm.doLogin = doLogin;

            function doLogin() {

                console.log("Hello");


                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $state.go('app.generator', {}, { location: "replace", reload: true });
            }
        }
    ]);

})();