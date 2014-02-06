angular.module('innit.apps.pocketclock.filters', [])

.filter('fromNow', function() {
    return function(dateString) {
      return moment(dateString).fromNow()
    };
  });