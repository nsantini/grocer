'use strict';

app.factory('Day', function($firebase, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL + 'schedule_days');
  var days = $firebase(ref).$asArray();

  var Day = {
    create: function(day) {
      return days.$add(day);
    },
    recipes: function (dayId) {
      return $firebase(new Firebase(FIREBASE_URL + 'schedule_day_recipes/' + dayId));
    },
    recipesAsArray: function (dayId) {
      return Day.recipes(dayId).$asArray();
    },
    addRecipe: function(dayId, recipeId, recipeTitle) {
      return Recipe.ingredients(dayId).$set(recipeId, recipeTitle);
    }
  };

  return Day;
});
