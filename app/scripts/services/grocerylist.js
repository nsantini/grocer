'use strict';

app.factory('GroceryList', function(User, Schedule, Day, Recipe) {
  var GroceryList = {
    loadGroceryList: function(ingredients) {
      var user = User.getCurrent();
      Schedule.scheduleDaysAsArray(user.$id).$loaded().then(function(days) {
        for (var d = 0; d < days.length; d++) {
          Day.recipesAsArray(days.$getRecord(days.$keyAt(d)).$id).$loaded().then(function(recipes) {
            for (var r = 0; r < recipes.length; r++) {
              Recipe.ingredientsAsArray(recipes.$getRecord(recipes.$keyAt(r)).$id).$loaded().then(function(list) {
                for (var i = 0; i < list.length; i++) {
                  var item = list.$getRecord(list.$keyAt(i)).$value;
                  ingredients[item] = (ingredients[item] ? ingredients[item] + 1 : 1);
                }
              });
            }
          });
        }
      });
    }
  };
  return GroceryList;
})
