'use strict';

app.controller('ScheduleCtrl', function($scope, User, Schedule, Day, Recipe) {
  $scope.$on('CurrentUserSet', function () {
    var user = User.getCurrent();
    var days = Schedule.scheduleDaysAsArray(user.$id);
    days.$loaded().then(function() {
      $scope.days = days;
      $scope.dayRecipes = {};
      for (var day in days) {
        $scope.dayRecipes[days[day].$id] = Day.recipesAsArray(days[day].$id);
      }
    });
  });

  $scope.allRecipes = Recipe.all;

  $scope.recipeSelected = function(dayId) {
    Day.addRecipe(dayId, $scope.rec.split('|')[0], $scope.rec.split('|')[1]);
    $scope.rec = '';
  };
});
