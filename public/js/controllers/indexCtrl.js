var tcm = angular.module('tcm');

tcm.controller('IndexCtrl', function($scope, TestPlanFactory) {
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