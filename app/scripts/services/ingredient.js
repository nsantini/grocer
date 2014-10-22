'use strict';

app.factory('Ingredient', function($firebase, FIREBASE_URL, User) {
  var ref = new Firebase(FIREBASE_URL + 'ingredients');
  var ingredients = $firebase(ref).$asArray();

  var Ingredient = {
    all: ingredients,

    create: function(ingredient) {
      if (User.signedIn()) {
        return ingredients.$add(ingredient).then(function (ref) {
          return ref.name();
        });
      }
    },

    find: function(ingredientId) {
      return $firebase(ref.child(ingredientId)).$asObject();
    },

    save: function(ingredient) {
      if (User.signedIn()) {
        return ingredient.$save().then(function (ref) {
          return ref.name();
        });
      }
    },

    delete: function(ingredient) {
      if (User.signedIn()) {
        ingredients.$remove(ingredient);
      }
    }
  };

  return Ingredient;
});
