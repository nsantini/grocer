'use strict';

app.factory('GroceryList', function(User, Schedule, Day, Recipe) {
  var GroceryList = {

    ingredientsLoaded: function(ingredients) {
      for (var i = 0; i < ingredients.length; i++) {
        var item = ingredients.$getRecord(ingredients.$keyAt(i)).$value;
        this.ingredients[item] =
          (this.ingredients[item] ? this.ingredients[item] + 1 : 1);
      }
    },

    recipesLoaded: function(recipes) {
      for (var r = 0; r < recipes.length; r++) {
        Recipe.ingredientsAsArray(recipes.$getRecord(recipes.$keyAt(r)).$id)
          .$loaded()
          .then(GroceryList.ingredientsLoaded.bind(this));
      }
    },

    daysLoaded: function(days) {
      for (var d = 0; d < days.length; d++) {
        Day.recipesAsArray(days.$getRecord(days.$keyAt(d)).$id)
          .$loaded()
          .then(GroceryList.recipesLoaded.bind(this));
      }
    },

    loadGroceryList: function(ingredients) {
      var instance = {ingredients: ingredients};
      var user = User.getCurrent();
      Schedule.scheduleDaysAsArray(user.$id).$loaded().then(GroceryList.daysLoaded.bind(instance));
    }
  };
  return GroceryList;
});
