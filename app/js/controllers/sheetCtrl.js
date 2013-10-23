var tcm = angular.module('tcm');

tcm.controller('testPlanCtrl', function($scope) {
  
	var steps = [
		{
			setup: "1. View only and modifiable security is disabled for maintaining the purge prevention checkbox.",
			action: "1. Close the problem report\n2. Update some junk",
			outcome: "test",
			result: ''
		},
		{
			setup: "test2",
			action: "test2",
			outcome: "test2",
			result: ''
		},
		{
			setup: "test3",
			action: "test3",
			outcome: "test3",
			result: ''
		}
	];
	
	var steps2 = [
		{
			setup: "Junk",
			action: "1. Close the problem report\n2. Update some junk",
			outcome: "test",
			result: ''
		}
	];
	
  $scope.mode = 'edit';
  $scope.format = '';
  $scope.results = '';
  $scope.cols = ['Setup','Action','Expected Outcome','Result'];
  $scope.testPlan = [];
  $scope.testPlan.category = [];
	
	$scope.testPlan.push({name: "Category 1", testSteps: steps});
	$scope.testPlan.push({name: "Category 2", testSteps: steps2});
	
  $scope.setMode = function(mode) {
    $scope.mode = mode;
  };
  
  $scope.setResult = function(category, step, result) {
		$scope.testPlan[category].testSteps[step].result = result;
  };
  
  $scope.addStep = function(index) {
		$scope.testPlan[index].testSteps.push({setup: '', action: '', outcome: ''});
  };
	
	$scope.addCategory = function() {
		$scope.testPlan.push({name: "Test", testSteps: []});
	};
  
  $scope.removeStep = function(category, step) {
		$scope.testPlan[category].testSteps.splice(step, 1);
  };
	
	$scope.removeCategory = function(category) {
		$scope.testPlan.splice(category, 1);
	}
  
  $scope.setResultAll = function(result) {
    for(i=0; i<$scope.testPlan.length; i++) {
      $scope.testPlan.testSteps[i].result = result;
    };
  };
  
  $scope.saveTestPlan = function() {
    $scope.results = angular.toJson($scope.testPlan, true);
  };
});