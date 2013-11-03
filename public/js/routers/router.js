var tcm = angular.module('tcm');

tcm.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'IndexCtrl'
      })
      .when('/testplans', {
        templateUrl: 'views/testPlan.html',
        controller: 'TestPlanCtrl'
      })
      .when('/testplans/:extrnId', {
        templateUrl: 'views/testPlan.html',
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