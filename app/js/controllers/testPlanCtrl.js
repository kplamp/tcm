var tcm = angular.module('tcm');

tcm.controller('TestPlanCtrl', function($scope) {
  
  $scope.mode = 'edit';
  $scope.format = '';
  $scope.results = '';
  $scope.testPlan = {};
  $scope.testPlan.extrnId = "";
  $scope.testPlan.softwareChange = "";
  $scope.testPlan.testStrategy = "";
  $scope.testPlan.category = [{name:'', testSteps: [{setup: '',action:'',outcome:'',result:''}]}];
	
  $scope.setMode = function(mode) {
    $scope.mode = mode;
    if(mode === 'edit') {
      $scope.setResultAll(''); //Reset results;
    };
  };
  
  $scope.setResult = function(category, step, result) {
		$scope.testPlan.category[category].testSteps[step].result = result;
  };
  
  $scope.setResultCategory = function(category, result) {
    for(i=0; i<$scope.testPlan.category[category].testSteps.length; i++) {
      $scope.testPlan.category[category].testSteps[i].result = result;
    };
  };
  
  $scope.setResultAll = function(result) {
    for(i=0; i<$scope.testPlan.category.length; i++) {
      for(j=0; j<$scope.testPlan.category[i].testSteps.length; j++) {
        $scope.testPlan.category[i].testSteps[j].result = result;
      }
    };
  };
  
  $scope.addStep = function(index) {
		$scope.testPlan.category[index].testSteps.push({setup: '', action: '', outcome: ''});
  };
	
  $scope.removeStep = function(category, step) {
		$scope.testPlan.category[category].testSteps.splice(step, 1);
  };
  
	$scope.addCategory = function() {
    console.log($scope.testPlan);
		$scope.testPlan.category.push({name: '', testSteps: [{setup: '', action: '', outcome: ''}]});
	};
  
	$scope.removeCategory = function(index) {
		$scope.testPlan.category.splice(index, 1);
	};
  
  $scope.saveTestPlan = function() {
    $scope.results = angular.toJson($scope.testPlan, true);
  };
  
  $scope.loadJson = function() {
    if($scope.results) {
      $scope.testPlan = JSON.parse($scope.results);
    };
  };
  
  $scope.getTotalTestCases = function() {
    count = 0;
    for(i=0; i<$scope.testPlan.category.length; i++) {
      for(j=0; j<$scope.testPlan.category[i].testSteps.length; j++) {
        count ++;
      }
    }
    return count;
  };
  
  $scope.getPassedTestCases = function() {
    count = 0;
    for(i=0; i<$scope.testPlan.category.length; i++) {
      for(j=0; j<$scope.testPlan.category[i].testSteps.length; j++) {
        if($scope.testPlan.category[i].testSteps[j].result == 'success') {
          count ++;
        }
      }
    }
    return count;
  };
});