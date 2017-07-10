/**
 * Comments service
 */
(function() {

    angular
        .module('tokenGenerator')

    .service('commentsService', [
        '$http',
        'routesConfig',
        function($http, routesConfig) {
            'use strict';

            function _getComments() {
                return $http.get(routesConfig.comments.all());
            }

            return {
                getComments: _getComments
            };
        }
    ]);

})();