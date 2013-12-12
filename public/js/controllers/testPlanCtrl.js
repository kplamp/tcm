var tcm = angular.module('tcm');

tcm.controller('TestPlanCtrl', function($scope, $http, $routeParams, $location, TestPlanFactory, $rootScope) {
  // Reset rootScope error and information messages;
//  $rootScope.errors = '';
//  $rootScope.info = '';
  
  $scope.mode = 'edit';
  $scope.format = '';
  $scope.results = '';
  $scope.info = $rootScope.info;
  $scope.errors = $rootScope.errors;
  var planId = $routeParams.extrnId;
  var plan_Id = '';
  
  if(planId) {
    $http({
      method: 'GET',
      url: '/testplans/' + planId
    }).success( function(data, status, headers, config) {
      if(data.plan != null) {
        $scope.testPlan = data.plan;
        plan_Id = data.plan._id;
      }
      else {
        $scope.testPlan = _init();
        $scope.errors = 'Error retrieving plan ' + planId;
        planId = null;
      }
    }).error( function(data, status, headers, config) {
    $scope.errors = 'Error retrieving plan ' + planId;
    });
  }
  else {
    $scope.testPlan = _init();
  }
  
  $scope.setMode = function(mode) {
    $scope.mode = mode;
    if(mode === 'edit') {
      $scope.setResultAll(''); //Reset results;
    };
  };
  
  $scope.setResult = function(category, step, result) {
		$scope.testPlan.details.category[category].testSteps[step].result = result;
  };
  
  $scope.setResultCategory = function(category, result) {
    for(i=0; i<$scope.testPlan.details.category[category].testSteps.length; i++) {
      $scope.testPlan.details.category[category].testSteps[i].result = result;
    };
  };
  
  $scope.setResultAll = function(result) {
    for(i=0; i<$scope.testPlan.details.category.length; i++) {
      for(j=0; j<$scope.testPlan.details.category[i].testSteps.length; j++) {
        $scope.testPlan.details.category[i].testSteps[j].result = result;
      }
    };
  };
  
  $scope.addStep = function(index) {
		$scope.testPlan.details.category[index].testSteps.push({setup: '', action: '', outcome: ''});
  };
	
  $scope.removeStep = function(category, step) {
		$scope.testPlan.details.category[category].testSteps.splice(step, 1);
  };
  
	$scope.addCategory = function() {
		$scope.testPlan.details.category.push({name: '', testSteps: [{setup: '', action: '', outcome: ''}]});
	};
  
	$scope.removeCategory = function(index) {
		$scope.testPlan.details.category.splice(index, 1);
	};
  
  $scope.exportCopy = function(format) {
    $scope.results = _exportFormat(format, $scope.testPlan);
  };
  
  $scope.loadCopy = function(format) {    
    if(format == 'yaml') {
      if($scope.results) {
        try {
          $scope.testPlan = YAML.parse($scope.results);
          $scope.info = "Successfully imported test plan.";
          $scope.results = '';
          $location.path();
        }
        catch (e) { $scope.errors = e; }
      }
    }
    else if(format == 'json') {
      if($scope.results) {
        try {
          $scope.testPlan = JSON.parse($scope.results);
          $scope.info = "Successfully imported test plan.";
          $scope.results = '';
        }
        catch (e) { $scope.errors = e; }
      };
    }
    else {
      $scope.errors = "No valid import type selected to load";
    }
  };
  
  $scope.saveCopy = function() {
    $scope.testPlan.meta.modifiedDate = Date.now();
    $scope.testPlan._id = plan_Id ? plan_Id : null;
    if(planId) {
      try {
        TestPlanFactory.updateTestPlan($scope.testPlan)
                .success(function(data) {
                  $scope.info = data.msg;
        })
                .error(function(data) {
                  $scope.errors = data;
        });
      }
      catch (e) {
        $scope.errors = e;
      }
    }
    else {
      if($scope.testPlan.details.extrnId) {
        try {
          TestPlanFactory.addTestPlan($scope.testPlan)
                  .success(function(data) {
                    $location.path('testplans/plan/' + $scope.testPlan.details.extrnId);
          $scope.info = "Successfully added \n\n\n\n" + $scope.testPlan.details.extrnId;
          })
                  .error(function(data) {
                    $scope.errors = data;
          });
        }
        catch (e) {
          $scope.errors = e;
        }
      }
      else {
        $scope.errors = "External System ID Cannot Be Null";
      }
    }
  };
  
  $scope.setPlanSatatus = function(status) {
    $scope.testPlan.meta.active = status;
    $scope.testPlan.meta.modifiedDate = Date.now();
    $scope.testPlan._id = plan_Id ? plan_Id : null;
    if(planId) {
      try {
        TestPlanFactory.updateTestPlan($scope.testPlan)
                .success(function(data) {
                  $rootScope.info = "Successfully inactivated testplan " + $scope.testPlan.details.extrnId;
          $location.path('/testplans');
        })
                .error(function(data) {
                  $scope.errors = data;
        });
      }
      catch (e) {
        $scope.errors = e;
      }
    };
  };
  
  $scope.deletePlan = function() {
    $scope.testPlan.meta.modifiedDate = Date.now();
    var testPlanIdToDelete = $scope.testPlan.details.extrnId;
    TestPlanFactory.deleteTestPlan($scope.testPlan)
            .success(function(response) {
              $rootScope.info = "Successfully deleted " + testPlanIdToDelete;
      $location.path('/testplans');
    })
            .error(function(response) {
              $scope.errors = response;
      $location.path('/testplans');
    });
  };
  
  $scope.getTotalTestCases = function() {
    count = 0;
    for(i=0; i<$scope.testPlan.details.category.length; i++) {
      for(j=0; j<$scope.testPlan.details.category[i].testSteps.length; j++) {
        count ++;
      }
    }
    return count;
  };
  
  $scope.getCountByStatus = function(status) {
    count = 0;
    for(i=0; i<$scope.testPlan.details.category.length; i++) {
      for(j=0; j<$scope.testPlan.details.category[i].testSteps.length; j++) {
        if($scope.testPlan.details.category[i].testSteps[j].result == status) {
          count ++;
        }
      }
    }
    return count;
  };
  
  // Removes unnecessary key/value pairs from the exported test plan.
  function _removeHashKey(key, value) {
    if(key == "$$hashKey" || key == "_id" || key == "__v" || key == 'result') {
      return undefined;
    }
    else return value;
  }
  
  function _exportFormat(format, testPlan) {
    if(format == 'yaml') {
      var cleanedJson = JSON.stringify($scope.testPlan, _removeHashKey);
      cleanedJson = JSON.parse(cleanedJson);
      return YAML.stringify(cleanedJson, 10);
    }
    else if (format == 'json') {
      var cleanedJson = JSON.stringify($scope.testPlan, _removeHashKey);
      cleanedJson = JSON.parse(cleanedJson)
      return angular.toJson(cleanedJson, true);
    }
    else if (format == 'wiki') {
      var wikiPlan = '';
      wikiPlan += '^' + $scope.testPlan.details.extrnId;
      wikiPlan += '\n//' + $scope.testPlan.details.softwareChange;
      wikiPlan += '\n//' + $scope.testPlan.details.testStrategy;
      for(i=0; i<$scope.testPlan.details.category.length; i++) {
        wikiPlan += '\n//';
        wikiPlan += $scope.testPlan.details.category[i].name;
        for(j=0; j<$scope.testPlan.details.category[i].testSteps.length; j++) {
          wikiPlan += '\n';
          wikiPlan += '*Setup:* ' + $scope.testPlan.details.category[i].testSteps[j].setup;
          wikiPlan += ' \\\\ *Action:* ' + $scope.testPlan.details.category[i].testSteps[j].action;
          wikiPlan += ' \\\\ *Outcome:* ' + $scope.testPlan.details.category[i].testSteps[j].outcome;
        };
      };
      
      return wikiPlan;
    }
    else if (format == 'jira') {
      var jiraPlan = '';      
      
      jiraPlan += '||' + $scope.testPlan.details.extrnId + '|| ||';
      jiraPlan += '\n||' + $scope.testPlan.details.softwareChange + '|| ||';
      jiraPlan += '\n||' + $scope.testPlan.details.testStrategy + '|| ||';
      for(i=0; i<$scope.testPlan.details.category.length; i++) {
        jiraPlan += '\n||';
        jiraPlan += $scope.testPlan.details.category[i].name;
        jiraPlan += '|| ||';
        for(j=0; j<$scope.testPlan.details.category[i].testSteps.length; j++) {
          jiraPlan += '\n|';
          jiraPlan += '*Setup:* ' + $scope.testPlan.details.category[i].testSteps[j].setup;
          jiraPlan += '\\\\  *Action:* ' + $scope.testPlan.details.category[i].testSteps[j].action;
          jiraPlan += '\\\\  *Outcome:* ' + $scope.testPlan.details.category[i].testSteps[j].outcome;
          if($scope.mode == 'run') {
            switch($scope.testPlan.details.category[i].testSteps[j].result) {
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
      return jiraPlan;
    }
    else {
      $scope.errors = "No valid type selected to export";
    }
  };
  
  function _init() {
    var newTestPlan = {
      meta: {
        createdDate: Date.now,
        modifiedDate: ''
      }, 
      details: {
        extrnId: '',
        softwareChange: '',
        testStrategy: '',
        category: [
          {
            name: '',
            testSteps: [
              {
                setup: '',
                action: '',
                outcome: '',
                result: ''
              }
            ]
          }
        ]
      }
    };
    return newTestPlan;
  }
});