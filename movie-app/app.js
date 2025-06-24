var app = angular.module("movieApp", []);

app.controller("MovieController", function($scope, $http) {
  $scope.movieName = "";
  $scope.movie = null;
  $scope.error = "";

  $scope.searchMovie = function () {
    if (!$scope.movieName) return;

    const apiKey = "53530627";
    const url = `https://www.omdbapi.com/?t=${encodeURIComponent($scope.movieName)}&apikey=${apiKey}`;

    $http.get(url).then(function(response) {
      if (response.data.Response === "True") {
        $scope.movie = response.data;
        $scope.error = "";
      } else {
        $scope.movie = null;
        $scope.error = "Movie not found!";
      }
    }, function() {
      $scope.movie = null;
      $scope.error = "Something went wrong. Try again later.";
    });
  };
});
