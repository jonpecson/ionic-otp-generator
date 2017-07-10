/**
 * Categories controller
 */
(function() {
    angular
        .module('tokenGenerator')

    .controller('HomeController', [
        'Categories',
        function(Categories) {
            'use strict';

            var vm = this;

            Categories.getCategories().then(setCategories);

            function setCategories(categories) {
                vm.categories = categories;
            }

        }
    ]);

})();