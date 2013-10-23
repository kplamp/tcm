var tcm = angular.module('tcm');

tcm.controller('testPlanCtrl', function($scope) {
  
	var steps = [
		{
			setup: "1. View only and modifiable security is disabled for maintaining the purge prevention checkbox.",
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
	
  $scope.setMode = function(mode) {
    $scope.mode = mode;
    if(mode === 'edit') {
      $scope.setResultAll('');
    };
  };
  
  $scope.setResult = function(category, step, result) {
		$scope.testPlan[category].testSteps[step].result = result;
  };
  
  $scope.addStep = function(index) {
		$scope.testPlan[index].testSteps.push({setup: '', action: '', outcome: ''});
  };
	
	$scope.addCategory = function() {
		$scope.testPlan.push({name: '', testSteps: [{setup: '', action: '', outcome: ''}]});
	};
  
  $scope.removeStep = function(category, step) {
		$scope.testPlan[category].testSteps.splice(step, 1);
  };
	
	$scope.removeCategory = function(category) {
		$scope.testPlan.splice(category, 1);
	}
  
  $scope.setResultAll = function(result) {
    for(i=0; i<$scope.testPlan.length; i++) {
      for(j=0; j<$scope.testPlan[i].testSteps.length; j++) {
        $scope.testPlan[i].testSteps[j].result = result;
      }
    };
  };
  
  $scope.saveTestPlan = function() {
    $scope.results = angular.toJson($scope.testPlan, true);
  };
});