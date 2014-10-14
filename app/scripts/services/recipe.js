'use strict';

app.factory('Recipe', function($firebase, FIREBASE_URL, User) {
  var ref = new Firebase(FIREBASE_URL + 'recipes');
  var recipes = $firebase(ref).$asArray();

  var Recipe = {
    all: recipes,

    create: function(recipe) {
      if (User.signedIn()) {
        var user = User.getCurrent();

        recipe.owner = user.username;

        return recipes.$add(recipe).then(function (ref) {
          var recipeId = ref.name();

          User.recipes(user.username).$set(recipeId, recipeId);

          return recipeId;
        });
      }
    },
    save: function(recipe) {
      return recipe.$save().then(function (ref) {
        return ref.name();
      });
    },
    find: function(recipeId) {
      return $firebase(ref.child(recipeId)).$asObject();
    },
    delete: function(recipe) {
      if (User.signedIn()){
        var user = User.getCurrent();
        if (user.username === recipe.owner) {
          recipes.$remove(recipe).then(function () {
            User.recipes(user.username).$remove(recipe.$id);
          });
        }
      }
    },
    addIngredient: function(recipeId, ingredientId, ingredientTitle) {
      return Recipe.ingredients(recipeId).$set(ingredientId, ingredientTitle);
    },
    ingredients: function (recipe) {
      return $firebase(new Firebase(FIREBASE_URL + 'recipe_ingredients/' + recipe));
    }
  };

  return Recipe;
});
