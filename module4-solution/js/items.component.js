/*create a component called items that shows all of the menu items for a particular category.*/
(function () {
    'use strict';
    angular.module('MenuApp')
	.component('items', {
	    templateUrl: 'templates/allItems.template.html',
	    bindings: {
			items: '<'
	    }
	});
})();