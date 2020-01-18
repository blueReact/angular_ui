(function () {
  "use strict";

  // cart.controller.js
  angular
    .module('myApp')
    .factory('httpGetEndPoint', httpGetEndPoint);
    
  httpGetEndPoint.$inject = ['$http'];

  function httpGetEndPoint($http) {
    return {
      data: data
    }

    function data() {
      return $http.get('https://api.myjson.com/bins/qzuzi')
    }
  }


})();