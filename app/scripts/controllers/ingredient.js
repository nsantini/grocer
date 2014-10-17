'use strict';

app.controller('IngredientCtrl', function($scope, $location, $routeParams, Ingredient) {

  $scope.ingredient = Ingredient.find($routeParams.ingredientId);

  $scope.submitIngredient = function() {
    Ingredient.create($scope.ingredient).then(function(ingredientId) {
      $location.path('/ingredients/' + ingredientId);
    });
  };

  $scope.editIngredient = function() {
    Ingredient.save($scope.ingredient).then(function(ingredientId) {
      $location.path('/ingredients/' + ingredientId);
    });
  };
});
