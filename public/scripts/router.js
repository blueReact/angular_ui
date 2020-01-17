// route-config.js
angular
  .module('myApp')
  .config(config);

config.$inject = ['$routeProvider', '$locationProvider'];

function config($routeProvider, $locationProvider) {

  // use the HTML5 History API
  $locationProvider.html5Mode(true);

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