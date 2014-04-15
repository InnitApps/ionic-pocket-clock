var InnitPocketClock = angular.module('innit.app.pocketclock', ['ionic','innit.app','innit.app.pocketclock.controllers','innit.app.pocketclock.filters','innit.ui.chronograph']);

InnitPocketClock.config(function($stateProvider, $urlRouterProvider,$innitAppProvider,$locationProvider) {


  $innitAppProvider.setBaseUrl('http://localhost:1337');
 // $innitAPIProvider.setUrl('http://localhost:1337')

  $stateProvider

    .state('app.pocketclock',{
      abstract : true,
      url : '/pocketclock',
      templateUrl : 'views/pocketclock.html'
    })

    .state('timeLogList', {
      url: "/list",
      templateUrl: "/views/pocketclock.timelog-list.html",
      controller: 'TimeLogListCtrl'
    })

    .state('timeLog', {
      url: "/timelog",
      templateUrl: "/views/pocketclock.timeLog.html",
      controller: 'TimeLogCtrl'
    })

    // if none of the above are matched, go to this one
   // $urlRouterProvider.otherwise("/list");

   // $locationProvider.html5Mode(true);
    // if none of the above are matched, go to this one
    $urlRouterProvider.otherwise("/list");
})


// InnitPocketClock.controller('PocketClockCtrl', function($scope, $timeout, $ionicModal, Projects) {

  

// });