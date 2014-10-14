'use strict';

app.controller('NavCtrl', function($scope, $location, Auth) {

  $scope.logout = function() {
    Auth.logout();
  };

  $scope.isActive = function (viewLocation) {
    return viewLocation === $location.path();
  };
});
