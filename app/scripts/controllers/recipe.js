'use strict';

app.controller('RecipeCtrl', function($scope, $location, $routeParams, Recipe) {

  $scope.recipe = Recipe.find($routeParams.recipeId);

  $scope.submitRecipe = function() {
    Recipe.create($scope.recipe).then(function(recipeId) {
      $location.path('/recipes/' + recipeId);
    });
  };
});
