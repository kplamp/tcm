var tcm = angular.module('tcm');

tcm.controller('TestPlanCtrl', function($scope, $http, $routeParams, $location, TestPlanFactory, $rootScope) {
  // Reset rootScope error and information messages;
  $rootScope.errors = '';
  $rootScope.info = '';
  
  $scope.mode = 'edit';
  $scope.format = '';
  $scope.results = '';
  $scope.info = '';
  var planId = $routeParams.extrnId;
  
  if(planId) {
    $http({
      method: 'GET',
      url: '/testplans/' + planId
    }).success( function(data, status, headers, config) {
      $scope.testPlan = data.plan;
    }).error( function(data, status, headers, config) {
      $scope.errors = 'Error retrieving plan ' + planId;
    });
  }
  else {
    $scope.testPlan = {};
    $scope.testPlan.extrnId = "";
    $scope.testPlan.softwareChange = "";
    $scope.testPlan.testStrategy = "";
    $scope.testPlan.category = [{name:'', testSteps: [{setup: '',action:'',outcome:'',result:''}]}];
  }
  
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
  
  $scope.exportCopy = function(format) {
    if(format == 'yaml') {
      var cleanedJson = JSON.stringify($scope.testPlan, _removeHashKey);
      cleanedJson = JSON.parse(cleanedJson);
      $scope.results = YAML.stringify(cleanedJson, 10);
    }
    else if (format == 'json') {
      $scope.results = angular.toJson($scope.testPlan, true);
    }
    else if (format == 'wiki') {
      var wikiPlan = '';
      wikiPlan += '^' + $scope.testPlan.extrnId;
      wikiPlan += '\n//' + $scope.testPlan.softwareChange;
      wikiPlan += '\n//' + $scope.testPlan.testStrategy;
      for(i=0; i<$scope.testPlan.category.length; i++) {
        wikiPlan += '\n//';
        wikiPlan += $scope.testPlan.category[i].name;
        for(j=0; j<$scope.testPlan.category[i].testSteps.length; j++) {
          wikiPlan += '\n';
          wikiPlan += '*Setup:* ' + $scope.testPlan.category[i].testSteps[j].setup;
          wikiPlan += ' \\\\ *Action:* ' + $scope.testPlan.category[i].testSteps[j].action;
          wikiPlan += ' \\\\ *Outcome:* ' + $scope.testPlan.category[i].testSteps[j].outcome;
        };
      };
      
      $scope.results = wikiPlan;
    }
    else if (format == 'jira') {
      var jiraPlan = '';      
      
      jiraPlan += '||' + $scope.testPlan.extrnId + '|| ||';
      jiraPlan += '\n||' + $scope.testPlan.softwareChange + '|| ||';
      jiraPlan += '\n||' + $scope.testPlan.testStrategy + '|| ||';
      for(i=0; i<$scope.testPlan.category.length; i++) {
        jiraPlan += '\n||';
        jiraPlan += $scope.testPlan.category[i].name;
        jiraPlan += '|| ||';
        for(j=0; j<$scope.testPlan.category[i].testSteps.length; j++) {
          jiraPlan += '\n|';
          jiraPlan += '*Setup:* ' + $scope.testPlan.category[i].testSteps[j].setup;
          jiraPlan += '\\\\  *Action:* ' + $scope.testPlan.category[i].testSteps[j].action;
          jiraPlan += '\\\\  *Outcome:* ' + $scope.testPlan.category[i].testSteps[j].outcome;
          if($scope.mode == 'run') {
            switch($scope.testPlan.category[i].testSteps[j].result) {
              case 'success':
                jiraPlan += '|(/)|';
                break;
              case 'danger':
                jiraPlan += '|(x)|';
                break;
              default:
                jiraPlan += '|(?)|';
            }
          }
          else {
            jiraPlan += '|(?)|';
          }
        };
      };
      $scope.results = jiraPlan;
    }
    else {
    };
  };
  
  $scope.loadCopy = function(format) {    
    if(format == 'yaml') {
      if($scope.results) {
        $scope.testPlan = YAML.parse($scope.results);
      }
    }
    else if(format == 'json') {
      if($scope.results) {
        $scope.testPlan = JSON.parse($scope.results);
      };
    }
    else {
    }
  };
  
  $scope.saveCopy = function() {
    if(planId) {
      TestPlanFactory.updateTestPlan($scope.testPlan)
        .success(function(data) {
          $scope.info = data.msg;
        })
        .error(function(data) {
          $scope.errors = data;
        })
    }
    else {
      TestPlanFactory.addTestPlan($scope.testPlan)
        .success(function(data) {
          $location.path('testplans/' + $scope.testPlan.extrnId);
        })
        .error(function(data) {
          $scope.errors = data;
        });
    }
  };
  
  $scope.deletePlan = function() {
    var testPlanIdToDelete = $scope.testPlan.extrnId;
    TestPlanFactory.deleteTestPlan($scope.testPlan)
      .success(function(response) {
        $rootScope.info = "Successfully deleted " + testPlanIdToDelete;
        $location.path('/');
      })
      .error(function(response) {
        $scope.errors = response;
        $location.path('/');
      });
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
  
  $scope.getCountByStatus = function(status) {
    count = 0;
    for(i=0; i<$scope.testPlan.category.length; i++) {
      for(j=0; j<$scope.testPlan.category[i].testSteps.length; j++) {
        if($scope.testPlan.category[i].testSteps[j].result == status) {
          count ++;
        }
      }
    }
    return count;
  };
  
  function _removeHashKey(key, value) {
    if(key == "$$hashKey") {
      return undefined;
    }
    else return value;
  }
});