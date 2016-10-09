/* shows all available categories in the menu to the user.*/
(function () {
    'use strict';
    angular.module('MenuApp')
	.component('categories', {
	    templateUrl: '../templates/allCategories.template.html',
	    bindings: {
			items: '<'
	    }
	});
})();