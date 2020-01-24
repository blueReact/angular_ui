(function () {
  "use strict";

  // cart.controller.js
  angular
    .module('myApp')
    .controller('mainController', mainController)
    .factory('sharedData', function () {
      return [];
    });

  mainController.$inject = ['$scope', 'sharedData', 'httpGetEndPoint'];

  function mainController($scope, sharedData, httpGetEndPoint) {

    $scope.loadingSpinner = true;
    $scope.cart = sharedData;

    httpGetEndPoint.data().then(function (response) {
      $scope.inventory = response.data;
      $scope.loadingSpinner = false;
    }).catch(function () {
      $scope.loadingSpinner = true;
    });


    $scope.getItemNames = function () {

      return JSON.parse(localStorage.getItem("cartItemsCount"));
    }
    $scope.getItemNames();

    $scope.cartL = JSON.parse(localStorage.getItem("names"));

    var findItemById = function (items, id) {
      return _.find(items, function (item) {
        return item.id === id;
      });
    };

    $scope.getCost = function (item) {

      return item.qty * item.price;

    };

    $scope.getNewCost = function (item) {
      return item.qty * item.newPrice;
    };

    $scope.getDiscountCost = function (item) {
      return item.qty * item.discountValue;
    };

    $scope.addItem = function (itemToAdd) {
     
      console.log(itemToAdd)
      itemToAdd.qty = 1; // adding one by default
      itemToAdd.newPrice = itemToAdd.price - (itemToAdd.discount / 100 * itemToAdd.price)
      itemToAdd.discountValue = itemToAdd.price - itemToAdd.newPrice

      var found = findItemById($scope.cart, itemToAdd.id);
      
      if (found) {
        found.qty += itemToAdd.qty;
        console.log(found.qty)

        var items = JSON.parse(localStorage.getItem("names"));
        
        for (var i = 0; i < items.length; i++) {
          if (items[i].id === itemToAdd.id) {
            console.log(true)
            items[i].qty = found.qty
            localStorage.setItem("names", JSON.stringify(items));
            $scope.cartCounter(found.qty);
          }

        }
      } else {
        $scope.cart.push(angular.copy(itemToAdd));
        localStorage.setItem("names", JSON.stringify($scope.cart));
        $scope.cartCounter($scope.cart);
      }

    };

    $scope.getTotal = function () {
      var total = _.reduce($scope.cartL, function (sum, item) {
        return sum + $scope.getCost(item);
      }, 0);

      return total;
    };

    $scope.getItemCount = function () {

      return _.reduce($scope.cartL, function (sum, item) {
        return sum + item.qty;
      }, 0);

    }


    $scope.getNewTotal = function () {
      var total = _.reduce($scope.cartL, function (sum, item) {
        return sum + $scope.getNewCost(item);
      }, 0);

      return total;
    };

    $scope.getDiscount = function () {
      var total = _.reduce($scope.cartL, function (sum, item) {
        return sum + $scope.getDiscountCost(item);
      }, 0);

      return total;
    };


    $scope.removeItem = function (item) {

      var index = $scope.cartL.indexOf(item);
      $scope.cartL.splice(index, 1);
      $scope.cart.splice(index, 1);

      var temp = JSON.parse(localStorage.getItem("cartItemsCount"));
      let qty = item.qty;
     
      var result = temp - qty;
      
      localStorage.setItem('cartItemsCount', JSON.stringify(result));
      localStorage.setItem('names', JSON.stringify($scope.cartL));

    };
    
    $scope.cartCounter = function (item) {
      console.log(item)
      var temp = JSON.parse(localStorage.getItem('names'));
      for (var i = 0; i < temp.length; i++) {
        console.log(temp[i].id == item.id)

        if (temp[i].id == item.id) {
          temp[i].qty = item.qty
        }
      }

      let result = temp.map(a => a.qty);
      var cartL = result.reduce((a, b) => a + b);

      localStorage.setItem('cartItemsCount', JSON.stringify(cartL));
      //localStorage.setItem('names', JSON.stringify(temp));
    }

    $scope.increaseItemCount = function (item) {
      console.log(item);
      item.qty++;
      $scope.cartCounter(item);

      $scope.getItemNames();

    };

    $scope.decreaseItemCount = function (item) {
      if (item.qty > 0) {
        item.qty--;

        $scope.cartCounter(item);
        $scope.getItemNames();

      } else {
        return 0;
      }

    }

    $scope.priceSlider = {
      min: 0,
      max: 1000,
      ceil: 1000,
      floor: 0,
      step: 100
    };

    $scope.minFilter = function (item) {
      return item.price >= $scope.priceSlider.min;
    };

    $scope.maxFilter = function (item) {
      return item.price <= $scope.priceSlider.max;
    };


    $scope.sort = function (keyname) {
      $scope.sortKey = keyname; //set the sortKey to the param passed
      $scope.reverse = !$scope.reverse; //if true make it false and vice versa

    }

    $scope.toggle = true;
    $scope.toggleMobileSort = true;
    $scope.toggleMobileFilter = true;

  };

})();