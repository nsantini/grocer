'use strict';

app.factory('User', function ($firebase, FIREBASE_URL, Auth, $rootScope) {
  var ref = new Firebase(FIREBASE_URL + 'users');

  var User = {
    create: function (authUser, username) {
      var user = $firebase(ref.child(username)).$asObject();

      return user.$loaded(function () {
        user.username = username;
        user.md5_hash = authUser.md5_hash;
        user.$priority = authUser.uid;
        user.$save();
      });
    },
    findByUsername: function (username) {
      if (username) {
        return $firebase(ref.child(username)).$asObject();
      }
    },
    getCurrent: function () {
      return $rootScope.currentUser;
    },
    signedIn: function () {
      return $rootScope.currentUser !== undefined;
    },
    recipes: function (username) {
      return $firebase(new Firebase(FIREBASE_URL + 'user_recipes/' + username));
    },
  };

  $rootScope.$on('$firebaseSimpleLogin:login', function (e, authUser) {
    var query = $firebase(ref.startAt(authUser.uid).endAt(authUser.uid)).$asArray();

    query.$loaded(function () {
      setCurrentUser(query[0].username);
    });
  });

  $rootScope.$on('$firebaseSimpleLogin:logout', function() {
    delete $rootScope.currentUser;
  });

  function setCurrentUser (username) {
    $rootScope.currentUser = User.findByUsername(username);
  }

  return User;
});
