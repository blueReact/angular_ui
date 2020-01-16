// route-config.js
angular
  .module('myApp')
  .config(config);

config.$inject = ['$routeProvider'];

function config($routeProvider) {

  $routeProvider
    .when("/", {
      templateUrl: "partials/home.partial.html",
      controller: 'mainController',
      controllerAs: 'vm'
    })

    .when("/cart", {
      templateUrl: "partials/cart.partial.html",
      controller: 'mainController',
      controllerAs: 'vm'
    })

    .otherwise({
      templateUrl: 'partials/404.partial.html',
      controller: 'mainController',
      controllerAs: 'vm'
    });

}