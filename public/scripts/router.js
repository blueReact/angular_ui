// route-config.js
angular
  .module('myApp')
  .config(config);

config.$inject = ['$routeProvider'];

function config($routeProvider) {

  $routeProvider

    // Home page
    .when("/", {
      templateUrl: "partials/home/home.partial.html",
      controller: 'mainController'
    })

    // Cart Page
    .when("/cart", {
      templateUrl: "partials/cart/cart.partial.html",
      controller: 'mainController'
    })

    // 404 route
    .otherwise({
      templateUrl: 'partials/404.partial.html',
      controller: 'mainController'
    });

}