'use strict';

app.factory('Schedule', function($firebase, FIREBASE_URL, Day) {

  function createDay(day, scheduleDays) {
    Day.create(day).then(function(ref) {
      scheduleDays.$set(ref.name(), day.name);
    });
  }

  var Schedule = {
    create: function(user) {
      var days =[
        { name: 'Monday' },
        { name: 'Tuesday' },
        { name: 'Wednesday' },
        { name: 'Thursday' },
        { name: 'Friday' },
        { name: 'Saturday' },
        { name: 'Sunday' },
      ];
      var schDays = Schedule.scheduleDays(user.username);
      for (var day in days) {
        createDay(days[day], schDays);
      }
    },
    scheduleDays: function (username) {
      return $firebase(new Firebase(FIREBASE_URL + 'schedule_days_user/' + username));
    },
    scheduleDaysAsArray: function (username) {
      return Schedule.scheduleDays(username).$asArray();
    }
  };

  return Schedule;
});
