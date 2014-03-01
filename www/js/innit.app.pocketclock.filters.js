angular.module('innit.app.pocketclock.filters', [])

.filter('fromNow', function() {
    return function(dateString) {
      return moment(dateString).fromNow()
    };
  });