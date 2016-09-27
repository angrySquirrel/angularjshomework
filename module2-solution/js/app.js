(function () {
  'use strict';
  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    this.items = ShoppingListCheckOffService.toBuyItems;
    this.buyItem = ShoppingListCheckOffService.buyItem;
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    this.items = ShoppingListCheckOffService.alreadyBoughtItems;
  }

  function ShoppingListCheckOffService() {
    var service = this;

    service.toBuyItems = [
      {name: "cookies", quantity: 10},
      {name: "books", quantity: 2},
      {name: "apples", quantity: 10},
      {name: "iphones", quantity: 1},
      {name: "desktop pc", quantity: 2}
    ];
    service.alreadyBoughtItems = [];

    service.buyItem = function (index) {
      var removedItem = service.toBuyItems.splice(index, 1)[0];
      service.alreadyBoughtItems.push(removedItem);
    };
  }
})();
