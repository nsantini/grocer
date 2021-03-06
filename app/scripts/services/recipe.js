'use strict';

app.factory('Recipe', function($firebase, FIREBASE_URL, User) {
  var ref = new Firebase(FIREBASE_URL + 'recipes');
  var recipes = $firebase(ref).$asArray();

  var Recipe = {
    all: recipes,

    create: function(recipe) {
      if (User.signedIn()) {
        return recipes.$add(recipe).then(function (ref) {
          return ref.name();
        });
      }
    },
    save: function(recipe) {
      if (User.signedIn()) {
        return recipe.$save().then(function (ref) {
          return ref.name();
        });
      }
    },
    find: function(recipeId) {
      return $firebase(ref.child(recipeId)).$asObject();
    },
    remove: function(recipe) {
      if (User.signedIn()) {
        return $firebase(ref).$remove(recipe.$id).then(function () {
          Recipe.ingredients(recipe.$id).$remove();
        });
      }
    },
    delete: function(recipe) {
      if (User.signedIn()){
        recipes.$remove(recipe).then(function () {
          Recipe.ingredients(recipe.$id).$remove();
        });
      }
    },
    addIngredient: function(recipeId, ingredientId, ingredientTitle) {
      if (User.signedIn()){
        return Recipe.ingredients(recipeId).$set(ingredientId, ingredientTitle);
      }
    },
    removeIngredient: function(recipeId, ingredientId) {
      if (User.signedIn()){
        return Recipe.ingredients(recipeId).$remove(ingredientId);
      }
    },
    ingredients: function (recipeId) {
      return $firebase(new Firebase(FIREBASE_URL + 'recipe_ingredients/' + recipeId));
    },
    ingredientsAsArray: function(recipeId) {
      return Recipe.ingredients(recipeId).$asArray();
    }
  };

  return Recipe;
});
