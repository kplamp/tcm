var tcm = angular.module('tcm');

tcm.controller('sheet', function($scope) {
  
  $scope.mode = 'edit';

  $scope.cols = ['Setup','Action','Expected Outcome','Result'];
  
  $scope.testSteps = [
    {
      id: 1,
      setup: "test",
      action: "test",
      outcome: "test",
      result: 'success'
    },
    {
      id: 2,
      setup: "test2",
      action: "test2",
      outcome: "test2",
      result: 'success'
    },
    {
      id: 3,
      setup: "test3",
      action: "test3",
      outcome: "test3",
      result: 'danger'
    }
  ];
  
  $scope.setMode = function(mode) {
    $scope.mode = mode;
  };
  
  $scope.setResult = function(row, col, result) {
    console.log('Case: ' + row + ' ' + col);
    console.log('Result: ' + result);
  };
  
  $scope.addStep = function() {
    $scope.testSteps.push({setup: '', action: '', outcome: ''});
  };
  
  $scope.removeStep = function(item) {
    $scope.testSteps.splice($scope.testSteps.indexOf(item), 1);
  };
});