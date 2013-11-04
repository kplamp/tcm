var tcm = angular.module('tcm');

var url = '/testplans/';

tcm.factory('TestPlanFactory', function($http) {
  return {
    getAllTestPlans: function() {
      return $http.get(url);
    },
    addTestPlan: function(testplan) {
      return $http.post(url, {testplan: testplan});
    },
    deleteTestPlan: function(testplan) {
      return $http.delete(url + testplan.extrnId);
    }
  };
});