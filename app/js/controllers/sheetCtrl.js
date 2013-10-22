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
      result: ''
    },
    {
      id: 2,
      setup: "test2",
      action: "test2",
      outcome: "test2",
      result: ''
    },
    {
      id: 3,
      setup: "test3",
      action: "test3",
      outcome: "test3",
      result: ''
    }
  ];
  
  $scope.setMode = function(mode) {
    $scope.mode = mode;
  };
  
  $scope.setResult = function(item, result) {
    
    var index = $scope.testSteps.indexOf(item);
    $scope.testSteps[index].result = result;
  };
  
  $scope.addStep = function() {
    $scope.testSteps.push({setup: '', action: '', outcome: ''});
  };
  
  $scope.removeStep = function(item) {
    console.log(item);
    $scope.testSteps.splice($scope.testSteps.indexOf(item), 1);
  };
});