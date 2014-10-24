'use strict';

app.factory('GroceryList', function(User, Schedule, Day, Recipe) {
  var GroceryList = {
    ingredients: {},

    ingredientsLoaded: function(ingredients) {
      for (var i = 0; i < ingredients.length; i++) {
        var item = ingredients.$getRecord(ingredients.$keyAt(i)).$value;
        GroceryList.ingredients[item] =
          (GroceryList.ingredients[item] ? GroceryList.ingredients[item] + 1 : 1);
      }
    },

    recipesLoaded: function(recipes) {
      for (var r = 0; r < recipes.length; r++) {
        Recipe.ingredientsAsArray(recipes.$getRecord(recipes.$keyAt(r)).$id)
          .$loaded()
          .then(GroceryList.ingredientsLoaded);
      }
    },

    daysLoaded: function(days) {
      for (var d = 0; d < days.length; d++) {
        Day.recipesAsArray(days.$getRecord(days.$keyAt(d)).$id)
          .$loaded()
          .then(GroceryList.recipesLoaded);
      }
    },

    loadGroceryList: function(ingredients) {
      GroceryList.ingredients = ingredients;
      var user = User.getCurrent();
      Schedule.scheduleDaysAsArray(user.$id).$loaded().then(GroceryList.daysLoaded);
    }
  };
  return GroceryList;
});
