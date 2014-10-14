'use strict';

app.factory('Ingredient', function($firebase, FIREBASE_URL, User) {
  var ref = new Firebase(FIREBASE_URL + 'ingredients');
  var ingredients = $firebase(ref).$asArray();

  var Ingredient = {
    all: ingredients,

    create: function(ingredient) {
      if (User.signedIn()) {
        var user = User.getCurrent();

        ingredient.owner = user.username;

        return ingredients.$add(ingredient).then(function (ref) {
          var ingredientId = ref.name();

          User.ingredients(user.username).$set(ingredientId, ingredientId);

          return ingredientId;
        });
      }
    },
    find: function(ingredientId) {
      return $firebase(ref.child(ingredientId)).$asObject();
    },
    delete: function(ingredient) {
      if (User.signedIn()){
        var user = User.getCurrent();
        if (user.username === ingredient.owner) {
          ingredients.$remove(ingredient).then(function () {
            User.ingredients(user.username).$remove(ingredient.$id);
          });
        }
      }
    }
  };

  return Ingredient;
});
