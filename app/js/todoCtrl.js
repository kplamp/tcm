var app = angular.module('todoApp', []);

app.run(function($rootScope) {
  $rootScope.name = "Todo App";
});

app.controller('TodoController', function($scope) {
  $scope.todos = [
    {
      name: "Build Deck",
      done: true
    },
    {
      name: "Jump off Cliff",
      done: false
    }
  ];

  $scope.addTodo = function() {
    
    item = {
      name: $scope.newTodo,
      done: false
    };
    
    $scope.todos.push(item);
    $scope.newTodo = "";
  };
  
  $scope.deleteTodo = function(item) {
    console.log(item);
    $scope.todos.splice($scope.todos.indexOf(item), 1);
  };

});