// services/TaskService.js
app.service('TaskService', function() {
  const STORAGE_KEY = 'daily_tasks';

  this.getTasks = function() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  };

  this.saveTasks = function(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  };

  this.addTask = function(task) {
    const tasks = this.getTasks();
    tasks.push(task);
    this.saveTasks(tasks);
  };

  this.deleteTask = function(index) {
    const tasks = this.getTasks();
    tasks.splice(index, 1);
    this.saveTasks(tasks);
  };
});
