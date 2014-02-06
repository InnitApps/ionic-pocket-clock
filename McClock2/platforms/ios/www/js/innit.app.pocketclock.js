var InnitPocketClock = angular.module('innit.app.pocketclock', ['ionic','innit.app','innit.app.pocketclock.controllers','innit.app.pocketclock.controllers','innit.ui.chronograph']);

InnitPocketClock.config(function($stateProvider, $urlRouterProvider,$innitAppProvider,$locationProvider) {


  $innitAppProvider.setBaseUrl('http://192.168.1.68:1337')
 // $innitAPIProvider.setUrl('http://localhost:1337')

  $stateProvider
  .state('launcher',{
      url : '/launch',
      templateUrl : 'views/launcher.html',
      controller : 'AppLaunchController'
    })

    .state('pocketclock',{
      abstract : true,
      url : '/pocketclock'
    })
    .state('pocketclock.activityList', {
      url: "/list",
      templateUrl: "views/activity-list.html",
      controller: 'ActivityListCtrl'
    })
    .state('pocketclock.activityFactory', {
      url: "/factory",
      templateUrl: "views/activity-factory.html",
      controller: 'ActivityFactoryCtrl'
    })
    .state('pocketclock.activityConfirm', {
      url: "/confirm",
      templateUrl: "views/activity-confirm.html",
      controller: 'ActivityConfirmCtrl'
    })
    .state('pocketclock.clock', {
      url: "/clock",
      templateUrl: "views/clock.html",
      controller: 'ClockCtrl'
    })
    .state('pocketclock.activityDetail', {
      url: "/activity-detail",
      templateUrl: "views/activity-detail.html",
      controller: 'ActivityDetailCtrl'
    })

   // $locationProvider.html5Mode(true);
    // if none of the above are matched, go to this one
    $urlRouterProvider.otherwise("/launch");
})


// InnitPocketClock.controller('PocketClockCtrl', function($scope, $timeout, $ionicModal, Projects) {

  

// });