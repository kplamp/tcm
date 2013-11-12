var tcm = angular.module('tcm');

tcm.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
      })
      .when('/testplans', {
        templateUrl: 'views/testplans/main.html',
        controller: 'IndexCtrl'
      })
      .when('/testplans/plan/', {
        templateUrl: 'views/testplans/testPlan.html',
        controller: 'TestPlanCtrl'
      })
      .when('/testplans/plan/:extrnId', {
        templateUrl: 'views/testplans/testPlan.html',
        controller: 'TestPlanCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/reports', {
        templateUrl: 'views/reports.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
]);