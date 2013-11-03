var tcm = angular.module('tcm');

tcm.controller('HeaderController', function($scope) {
  $scope.menu = [
    {
      title: "Test Plans",
      link: "testplans"
    },
    {
      title: "Reports",
      link: "reports"
    },
    {
      title: "About",
      link: "about"
    }
  ];
});