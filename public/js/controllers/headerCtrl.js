var tcm = angular.module('tcm');

tcm.controller('HeaderController', function($scope) {
  $scope.menu = [
    {
      title: "Test Plans",
      link: ""
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