'use strict';

app.controller('RecipeCtrl', function($scope, $location, $routeParams, Recipe, Ingredient) {

  $scope.recipe = Recipe.find($routeParams.recipeId);

  //TODO this needs to be filtered and loaded on demand!
  $scope.ingredients = Ingredient.all;

  $scope.submitRecipe = function() {
    Recipe.create($scope.recipe).then(function(recipeId) {
      $location.path('/recipes/' + recipeId);
    });
  };

  $scope.ingredientSelected = function() {
    if (!$scope.recipe.ingredients) {
      $scope.recipe.ingredients = [];
    }
    $scope.recipe.ingredients.push($scope.ingredient);
    $scope.ingredient = "";
  }
});
