'use strict';

app.controller('ScheduleCtrl', function($scope, User, Schedule, Day, Recipe) {

  function loadSchedule() {
    var user = User.getCurrent();
    Schedule.scheduleDaysAsArray(user.$id).$loaded().then(function(days) {
      $scope.days = days;
      for (var d = 0; d < days.length; d++) {
        var dayId = days.$getRecord(days.$keyAt(d)).$id;
        $scope.dayRecipes[dayId] = Day.recipesAsArray(dayId);
        $scope.rec[dayId] = '';
      }
    });
  }

  if (User.signedIn()) {
    loadSchedule();
  }

  $scope.days = [];
  $scope.dayRecipes = {};
  $scope.rec = {};

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
  };
});
