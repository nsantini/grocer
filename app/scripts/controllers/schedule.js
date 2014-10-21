'use strict';

app.controller('ScheduleCtrl', function($scope, User, Schedule, Day, Recipe) {

  function loadSchedule() {
    var user = User.getCurrent();
    var days = Schedule.scheduleDaysAsArray(user.$id);
    days.$loaded().then(function() {
      $scope.days = days;
      $scope.dayRecipes = {};
      $scope.rec = {};
      for (var day in days) {
        $scope.dayRecipes[days[day].$id] = Day.recipesAsArray(days[day].$id);
        $scope.rec[days[day].$id] = '';
      }
    });
  }

  if (User.signedIn()) {
    loadSchedule();
  }

  $scope.$on('CurrentUserSet', function () {
    loadSchedule();
  });

  $scope.allRecipes = Recipe.all;

  $scope.recipeSelected = function(dayId) {
    Day.addRecipe(dayId, $scope.rec[dayId].split('|')[0], $scope.rec[dayId].split('|')[1]);
    $scope.rec[dayId] = '';
  };

  $scope.removeRecipe = function(dayId, recipeId) {
    Day.removeRecipe(dayId, recipeId);
  }
});
