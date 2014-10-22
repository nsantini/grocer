'use strict';

app.controller('GrocerylistCtrl', function($scope, User, GroceryList) {
  $scope.ingredients = {};

  if (User.signedIn()) {
    GroceryList.loadGroceryList($scope.ingredients);
  }

  $scope.$on('CurrentUserSet', function () {
    GroceryList.loadGroceryList($scope.ingredients);
  });
});
