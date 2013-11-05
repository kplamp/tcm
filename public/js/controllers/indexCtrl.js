var tcm = angular.module('tcm');

tcm.controller('IndexCtrl', function($scope, TestPlanFactory, $rootScope) {
  $scope.info = $rootScope.info;
  $scope.errors = $rootScope.errors;
  $scope.testPlans = [];
  TestPlanFactory.getAllTestPlans().success(function(response) {
    $scope.testPlans = response.testplans;
  });
  
//  $http({
//    method: 'GET',
//    url: '/testplans'
//  }).success(function(data) {
//    console.log(data.testPlans);
//    $scope.testPlans = data.testplans;
//  }).error(function(data) {
//    console.log('Error getting test plans ' + data);
//  });
});