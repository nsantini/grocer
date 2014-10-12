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
    .otherwise({
      redirectTo: '/'
    });
});

app.constant('FIREBASE_URL', 'https://PUT-YOUR-FIREBASE-URL-HERE.firebaseio.com/');
