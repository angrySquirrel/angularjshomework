/*MenuDataService should have 2 methods:
getAllCategories - this method should return a promise which is a result of using the $http service,
 using the following REST API endpoint: https://davids-restaurant.herokuapp.com/categories.json
getItemsForCategory(categoryShortName) - 
this method should return a promise which is a result of using the $http service,
 using the following REST API endpoint: 
 https://davids-restaurant.herokuapp.com/menu_items.json?category=, 
 where, before the call to the server, your code should append whatever categoryShortName 
 value was passed in as an argument into the getItemsForCategory method.*/

(function() {
    'use strict';
    
    angular.module('Data')
    .service('MenuDataService', MenuDataService);

    MenuDataService.inject = ["$http"];
    function MenuDataService($http) {
		var service = this;

		// service.getAllCategories = function() {
		//     return $http({
		// 		method: "GET",
		//         url: "https://davids-restaurant.herokuapp.com/categories.json"
		//     }).then(function(result) {
		// 		return result.data;
		//     });
		// };
		service.getAllCategories = function() {
		    return $http({
				method: "GET",
		        url: "https://davids-restaurant.herokuapp.com/categories.json"
		    });
		};

		// service.getItemsForCategory = function(categoryShortName) {
		//     return $http({
		// 		method: "GET",
		//         url: "https://davids-restaurant.herokuapp.com/menu_items.json",
		// 		params: { category: categoryShortName }
		//     }).then(function (result) {
		// 		return result.data["menu_items"];
		//     });
		// };
		service.getItemsForCategory = function(categoryShortName) {
		    return $http({
				method: "GET",
		        url: "https://davids-restaurant.herokuapp.com/menu_items.json",
				params: { category: categoryShortName }
		    });
		};


    }
})();
