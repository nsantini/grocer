'use strict';

app.controller('IngredientsCtrl', function($scope, $location, Ingredient) {
  $scope.ingredients = Ingredient.all;

  $scope.deleteIngredient = function(ingredient) {
    Ingredient.delete(ingredient);
  };

  $scope.submitIngredient = function() {
    Ingredient.create($scope.ingredient).then(function(ingredientId) {
      $location.path('/ingredients/' + ingredientId + '/edit');
    });
  };
});
