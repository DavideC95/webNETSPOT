var app = angular.module('app', [ 'ui.router', 'ui.bootstrap' ]);

app.controller('homeController', function ($scope) {
  $scope.helloworld = "Hello world by AngularJS";
});

app.controller('pageController', function ($scope) {
  $scope.example = "page";
});
