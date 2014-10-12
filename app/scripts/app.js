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
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
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
    .otherwise({
      redirectTo: '/'
    });
});

app.constant('FIREBASE_URL', 'https://dazzling-heat-538.firebaseio.com/');
