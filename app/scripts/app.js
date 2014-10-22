'use strict';
/*global app: true*/

/**
 * @ngdoc overview
 * @name grocerApp
 * @description
 * # grocerApp
 *
 * Main module of the application.
 */
var app = angular.module('grocerApp', [
    'ngRoute',
    'firebase'
  ]);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/about', {
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl'
    })
    .when('/register', {
      templateUrl: 'views/register.html',
      controller: 'AuthCtrl'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'AuthCtrl'
    })
    .when('/recipes', {
      templateUrl: 'views/recipes.html',
      controller: 'RecipesCtrl'
    })
    .when('/recipes/:recipeId', {
      templateUrl: 'views/showrecipe.html',
      controller: 'RecipeCtrl'
    })
    .when('/recipes/:recipeId/edit', {
      templateUrl: 'views/editrecipe.html',
      controller: 'RecipeCtrl'
    })
    .when('/ingredients', {
      templateUrl: 'views/ingredients.html',
      controller: 'IngredientsCtrl'
    })
    .when('/ingredients/:ingredientId', {
      templateUrl: 'views/showingredient.html',
      controller: 'IngredientCtrl'
    })
    .when('/ingredients/:ingredientId/edit', {
      templateUrl: 'views/editingredient.html',
      controller: 'IngredientCtrl'
    })
    .when('/schedule', {
      templateUrl: 'views/schedule.html',
      controller: 'ScheduleCtrl'
    })
    .when('/grocerylist', {
      templateUrl: 'views/grocerylist.html',
      controller: 'GrocerylistCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});

app.constant('FIREBASE_URL', 'https://dazzling-heat-538.firebaseio.com/');
