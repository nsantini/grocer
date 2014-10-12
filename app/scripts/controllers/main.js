'use strict';

/**
 * @ngdoc function
 * @name grocerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the grocerApp
 */
angular.module('grocerApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
