var tcm = angular.module('tcm');

tcm.controller('HeaderController', function($scope) {
  $scope.menu = [
    {
      title: "Test Plans",
      link: ""
    },
    {
      title: "About",
      link: "about"
    }
  ];
});