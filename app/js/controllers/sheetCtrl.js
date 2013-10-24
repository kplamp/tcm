var tcm = angular.module('tcm');

tcm.controller('testPlanCtrl', function($scope) {
	
  $scope.mode = 'edit';
  $scope.format = '';
  $scope.results = '';
  $scope.cols = ['Setup','Action','Expected Outcome','Result'];
  $scope.testPlan = {};
  $scope.testPlan.extrnId = "SFS-12345";
  $scope.testPlan.softwareChange = "";
  $scope.testPlan.testStrategy = "";
  $scope.testPlan.comments = "";
  $scope.testPlan.category = [];
//  $scope.testPlan.category.push({name: "test", testSteps: []});
	
	
  $scope.setMode = function(mode) {
    $scope.mode = mode;
    if(mode === 'edit') {
      $scope.setResultAll('');
    };
  };
  
  $scope.setResult = function(category, step, result) {
		$scope.testPlan.category[category].testSteps[step].result = result;
  };
  
  $scope.addStep = function(index) {
		$scope.testPlan.category[index].testSteps.push({setup: '', action: '', outcome: ''});
  };
	
	$scope.addCategory = function() {
    console.log($scope.testPlan);
		$scope.testPlan.category.push({name: '', testSteps: [{setup: '', action: '', outcome: ''}]});
	};
  
  $scope.removeStep = function(category, step) {
		$scope.testPlan.category[category].testSteps.splice(step, 1);
  };
	
	$scope.removeCategory = function(category) {
		$scope.testPlan.category.splice(category, 1);
	}
  
  $scope.setResultAll = function(result) {
    for(i=0; i<$scope.testPlan.category.length; i++) {
      for(j=0; j<$scope.testPlan.category[i].testSteps.length; j++) {
        $scope.testPlan.category[i].testSteps[j].result = result;
      }
    };
  };
  
  $scope.saveTestPlan = function() {
    $scope.results = angular.toJson($scope.testPlan, true);
  };
});