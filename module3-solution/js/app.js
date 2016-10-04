
(function(){
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('baseURL', 'https://davids-restaurant.herokuapp.com/');

function FoundItemsDirective() {
    var ddo = {
        templateUrl: './templates/found-items.html',
        scope: {
            items: '<',
            onRemove: '&',
        },
        controller: FoundItemsController,
        controllerAs: 'ctrlr',
        bindToController: true,
    };

    return ddo;
}

function FoundItemsController() {
    var ctrlr = this;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
    var nidCtrler = this;//save context
    nidCtrler.queryString = '';
    nidCtrler.message = '';
    nidCtrler.foundItems = [];

    nidCtrler.narrowItDown = narrowItDown;
    nidCtrler.removeItem = removeItem;

    function narrowItDown() {
        var str = nidCtrler.queryString.trim();
        if (str) {
            var promise = MenuSearchService.getMatchedMenuItems(str);

            promise.then(function (result) {
                nidCtrler.foundItems = result;
                nidCtrler.message = (nidCtrler.foundItems.length) ?
                    '' : 'Sorry, no matches found';
            })
            .catch(function (err) {
                nidCtrler.message = 'Sorry, failed to retrieve items, please check internet connection';
            });
        } else {
            nidCtrler.message = 'Empty String, please type in the query first';
        }
    }

    function removeItem(index) {
        if(nidCtrler.foundItems[index] != undefined){
            var item = nidCtrler.foundItems.splice(index, 1);
            return item;
        }
    }
}

MenuSearchService.$inject = ['$http', '$q','baseURL'];
function MenuSearchService($http, $q, baseURL) {
    var service = this;

    service.getMatchedMenuItems = getMatchedMenuItems;

    var menuItems; // menuItems cache

    function getMenuItems() {
        if (!menuItems) {
            var response = $http({
                method: 'GET',
                url: (baseURL + 'menu_items.json'),
                params: {},
            });
            return response;
        } else {
            var deferred = $q.defer();
            deferred.resolve({
                data: {
                    menu_items: menuItems,
                },
            });
            return deferred.promise;
        }
    }

    function checkForMatch(menuItems, str) {
        var found = []; // array of matches to be returned
        for (var i = 0; i < menuItems.length; i++) {
            var item = menuItems[i];
            if (item.description.indexOf(str) != -1) {
                found.push(item);
            }
        }
        return found;
    }

    function getMatchedMenuItems(str) {
        var deferred = $q.defer();

        var promise = getMenuItems(); // retrive all menu items
        promise.then(function(response) {
            menuItems = response.data.menu_items;
            var itemsFound = checkForMatch(menuItems, str);
            deferred.resolve(itemsFound);
        })
        .catch(function(err) {
            deferred.reject(err);
        });

        return deferred.promise; //return a promise
    }
}
})();
