'use strict';

app.controller('RecipesCtrl', function($scope, $location, Recipe) {
  $scope.recipes = Recipe.all;

  $scope.deleteRecipe = function(recipe) {
    Recipe.delete(recipe);
  };

  $scope.submitRecipe = function() {
    Recipe.create($scope.recipe).then(function(recipeId) {
      $location.path('/recipes/' + recipeId);
    });
  };
});
