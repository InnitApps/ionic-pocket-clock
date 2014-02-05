var InnitPocketClock = angular.module('innitPocketClock', ['ionic','innit.app.pocketclock.controllers','innit.app.pocketclock.controllers','innit.ui.chronograph']);

InnitPocketClock.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('timeLogList', {
      url: "/list",
      templateUrl: "/views/timelog-list.html",
      controller: 'TimeLogListCtrl'
    })

    // if none of the above are matched, go to this one
    $urlRouterProvider.otherwise("/list");
})




InnitPocketClock.controller('PocketClockCtrl', function($scope, $timeout, $ionicModal, Projects) {

  

});