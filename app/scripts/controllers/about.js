'use strict';

/**
 * @ngdoc function
 * @name grocerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the grocerApp
 */
angular.module('grocerApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
