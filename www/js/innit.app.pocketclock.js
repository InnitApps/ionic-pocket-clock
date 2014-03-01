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
    .state('app.pocketclock.activityList', {
      url: "/list",
      templateUrl: "views/activity-list.html",
      controller: 'ActivityListCtrl'
    })
    .state('app.pocketclock.activityFactory', {
      url: "/factory",
      templateUrl: "views/activity-factory.html",
      controller: 'ActivityFactoryCtrl'
    })
    .state('app.pocketclock.activityConfirm', {
      url: "/confirm",
      templateUrl: "views/activity-confirm.html",
      controller: 'ActivityConfirmCtrl'
    })
    .state('app.pocketclock.clock', {
      url: "/clock",
      templateUrl: "views/clock.html",
      controller: 'ClockCtrl'
    })
    .state('app.pocketclock.activityDetail', {
      url: "/activity-detail",
      templateUrl: "views/activity-detail.html",
      controller: 'ActivityDetailCtrl'
    })

    $stateProvider
    .state('timeLogList', {
      url: "/list",
      templateUrl: "/views/timelog-list.html",
      controller: 'TimeLogListCtrl'
    })

    // if none of the above are matched, go to this one
   // $urlRouterProvider.otherwise("/list");

   // $locationProvider.html5Mode(true);
    // if none of the above are matched, go to this one
    $urlRouterProvider.otherwise("/list");
})


// InnitPocketClock.controller('PocketClockCtrl', function($scope, $timeout, $ionicModal, Projects) {

  

// });