var InnitPocketClock = angular.module('innitPocketClock', ['ionic','innit.app.pocketclock.controllers','innit.app.pocketclock.controllers','innit.ui.chronograph']);

InnitPocketClock.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('activityList', {
      url: "/list",
      templateUrl: "/views/activity-list.html",
      controller: 'ActivityListCtrl'
    })

    // if none of the above are matched, go to this one
    $urlRouterProvider.otherwise("/list");
})




InnitPocketClock.controller('PocketClockCtrl', function($scope, $timeout, $ionicModal, Projects) {

  

});