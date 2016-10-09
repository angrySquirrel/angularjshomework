(function () {
    'use strict';

    angular.module('MenuApp')
	.config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

	    $urlRouterProvider.otherwise('/');

	    $stateProvider
	    .state('home', {
			url: '/',
			templateUrl: 'templates/home.template.html'
	    })
	    .state('categories', {
			url: '/categories',
			templateUrl: 'templates/categories.template.html',
			controller: 'CategoriesController as categories',
			resolve: {
			    items: ['MenuDataService', function(MenuDataService) {
				return MenuDataService.getAllCategories();
			    }]
			}
	    })
	    .state('items', {
			url: '/items/{itemId}',
			templateUrl: 'templates/items.template.html',
			controller: 'ItemDetailController as items',
			resolve: {
			    items: ['$stateParams', 'MenuDataService', function($stateParams, MenuDataService) {
					return MenuDataService.getItemsForCategory($stateParams.itemId);
			    }]
			}
	    });
    }
})();