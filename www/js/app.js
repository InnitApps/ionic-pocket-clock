var InnitPocketClock = angular.module('innitPocketClock', ['ionic','innit.app.pocketclock.controllers','innit.app.pocketclock.controllers','innit.ui.chronograph']);

InnitPocketClock.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('activityList', {
      url: "/list",
      templateUrl: "/views/activity-list.html",
      controller: 'ActivityListCtrl'
    })
    .state('activityFactory', {
      url: "/factory",
      templateUrl: "/views/activity-factory.html",
      controller: 'ActivityFactoryCtrl'
    })
    .state('activityConfirm', {
      url: "/confirm",
      templateUrl: "/views/activity-confirm.html",
      controller: 'ActivityConfirmCtrl'
    })
    .state('clock', {
      url: "/clock",
      templateUrl: "/views/clock.html",
      controller: 'ClockCtrl'
    })
    .state('activityDetail', {
      url: "/activity-detail",
      templateUrl: "/views/activity-detail.html",
      controller: 'ActivityDetailCtrl'
    })

    // if none of the above are matched, go to this one
    $urlRouterProvider.otherwise("/list");
})




InnitPocketClock.controller('PocketClockCtrl', function($scope, $timeout, $ionicModal, Projects) {

  

});