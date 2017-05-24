var app = angular.module('app');

app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('/', {
      url: '/home',
      templateUrl: 'partials/home.html',
      controller: 'homeController'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'partials/login.html',
    })
    .state('register', {
      url: '/register',
      templateUrl: 'partials/register.html',
    })
    .state('about', {
      url: '/about',
      templateUrl: 'partials/about.html',
    });
});
