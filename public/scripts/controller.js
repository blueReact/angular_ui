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


    $scope.getItemNames = function (item) {

      return JSON.parse(localStorage.getItem("names"));
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


      itemToAdd.qty = 1; // adding one by default
      itemToAdd.newPrice = itemToAdd.price - (itemToAdd.discount / 100 * itemToAdd.price)
      itemToAdd.discountValue = itemToAdd.price - itemToAdd.newPrice

      var found = findItemById($scope.cart, itemToAdd.id);
      if (found) {
        found.qty += itemToAdd.qty;
      } else {
        $scope.cart.push(angular.copy(itemToAdd));
        localStorage.setItem("names", JSON.stringify($scope.cart));
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
      localStorage.setItem('names', JSON.stringify($scope.cartL));

    };


    $scope.increaseItemCount = function (item) {
      item.qty++;
    };

    $scope.decreaseItemCount = function (item) {
      if (item.qty > 0) {
        item.qty--;
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