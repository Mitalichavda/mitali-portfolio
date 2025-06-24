// controllers/TaskController.js
app.controller('TaskController', function($scope, TaskService) {
  $scope.tasks = TaskService.getTasks();
  $scope.newTask = {};

  $scope.addTask = function() {
    if (!$scope.newTask.title || !$scope.newTask.dueDate) return;

    TaskService.addTask(angular.copy($scope.newTask));
    $scope.tasks = TaskService.getTasks();
    $scope.newTask = {};
  };

  $scope.deleteTask = function(index) {
    TaskService.deleteTask(index);
    $scope.tasks = TaskService.getTasks();
  };

  $scope.saveTasks = function() {
    TaskService.saveTasks($scope.tasks);
  };
});



