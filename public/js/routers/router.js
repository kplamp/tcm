var tcm = angular.module('tcm');

tcm.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/testPlan.html',
        controller: 'TestPlanCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html'
      })
      .when('/reports', {
        templateUrl: 'views/reports.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
]);