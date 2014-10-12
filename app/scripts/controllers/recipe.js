'use strict';

app.controller('RecipeCtrl', function($scope, $location, $routeParams, Recipe, Ingredient) {

  $scope.recipe = Recipe.find($routeParams.recipeId);
  $scope.recipeIngredients = Recipe.ingredients($routeParams.recipeId).$asArray();

  //TODO this needs to be filtered and loaded on demand!
  $scope.ingredients = Ingredient.all;

  $scope.submitRecipe = function() {
    Recipe.create($scope.recipe).then(function(recipeId) {
      $location.path('/recipes/' + recipeId);
    });
  };

  $scope.ingredientSelected = function(recipeId) {
    Recipe.addIngredient(recipeId, $scope.ingredient);
    $scope.ingredient = "";
  }
});
