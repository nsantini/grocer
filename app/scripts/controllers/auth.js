'use strict';

app.controller('AuthCtrl', function($scope, $location, Auth, User) {
  function goHome() {
    $location.path('/');
  }

  if (Auth.signedIn()) {
    goHome();
  }

  $scope.$on('$firebaseSimpleLogin:login', function () {
    goHome();
  });

  $scope.login = function() {
    Auth.login($scope.user).then(function() {
      goHome();
    }, function(error) {
      $scope.error = error.toString();
    });
  };

  $scope.register = function() {
    Auth.register($scope.user).then(function(authUser) {
      console.log(authUser);
      User.create(authUser, $scope.user.username);
      $scope.login();
    }, function (error) {
        $scope.error = error.toString();
      });
  };
});
