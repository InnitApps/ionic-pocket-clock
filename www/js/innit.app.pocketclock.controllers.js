var pocketClock = angular.module('innit.app.pocketclock.controllers',['innit.app.pocketclock.factories']);

// pocketClock.controller('NavigationCtrl',function($rootScope,$scope,$state){
  
//   console.log("Hello Navigation Controller!")

// })

pocketClock.controller('TimeLogListCtrl',function($rootScope,$scope,$state,TimeLogs,Projects,ServiceItems,$ionicModal){
  
  console.log("Hello Time Log List Controller!")

  $scope.leftButtons = [
    { 
      type: 'button-positive',
      content: '<i class="icon ion-navicon"></i>',
      tap: function(e) {
      }
    }
  ];

  $scope.rightButtons = [
    { 
      type: 'button-clear',
      content: '<i class="icon ion-compose"></i>',
      tap: function(e) {
      	console.log("let's create a new log")
        $scope.newTimeLog()
      }
    }
  ]

  $scope.timeLogs = TimeLogs.all();
  $scope.projects = Projects.all();
  $scope.serviceItems = ServiceItems.all();

  $scope.$watch('selectedTimeLog.active',function(val){
    
    if(val){

      angular.forEach($scope.timeLogs, function(_log) { 
        
        _log.isVisible = true 

      });

      $scope.selectedTimeLog.isVisible = false
    }
    else{
      
      angular.forEach($scope.timeLogs, function(_log) { 
        
        _log.isVisible = false 

      });
    }
  })

  $scope.toggleTimeLog = function(timeLog){

    $scope.selectedTimeLog = timeLog

    if($scope.selectedTimeLog.active){

      $scope.selectedTimeLog.active = false
      
      angular.forEach($scope.timeLogs, function(_log) { 
        
        _log.isVisible = true 

      });

    }
    else if(!$scope.selectedTimeLog.active){

      angular.forEach($scope.timeLogs, function(_log) {
        _log.active = false  
        _log.isVisible = false                   
      });

      $scope.selectedTimeLog.active = true

    }

  }

  // Create and load the Modal
  $ionicModal.fromTemplateUrl('new-timelog.html', function(modal) {
    $scope.timeLogModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  // Called when the form is submitted
  $scope.createtimeLog = function(timeLog) {
    $scope.timeLogs.push(timeLog);
    $scope.timeLogModal.hide();
  };

  // Open our new time log modal
  $scope.newTimeLog = function() {
    console.log("show the modal")
    $scope.selectedProject = null
    $scope.selectedServiceItem = null
    $scope.isOverhead = false
    $scope.timeLogModal.show();
  };

  // Close the new time log modal
  $scope.closeNewTimeLog = function() {
    $scope.timeLogModal.hide();
  };

  //Modal

  $scope.selectedProject = null
  $scope.selectedServiceItem = null
  $scope.showProjects = true
  $scope.showServiceItems = false
  $scope.isOverhead = false
  $scope.toggleButtonText = "Overhead"
  $scope.titleText = "Billable"

  $scope.$watch('isOverhead',function(val){
    if(val == true){

      $scope.toggleButtonText = "Billable"
      $scope.titleText = "Overhead"
      $scope.showProjects = false
      $scope.showServiceItems = true

    }
    else if(val == false){
      $scope.toggleButtonText = "Overhead"
      $scope.titleText = "Billable"
      $scope.showProjects = true
      $scope.showServiceItems = false
      
    }
    
    $scope.selectedProject = null
    $scope.selectedServiceItem = null

  })

  $scope.toggleOverhead = function() {

        $scope.isOverhead = !$scope.isOverhead
  };

  // Called to select the given project
  $scope.selectProject = function(project) {
    $scope.selectedProject = project;
    Projects.setSelected($scope.selectedProject);
    $scope.showProjects = false
    $scope.showServiceItems = true
  };

  // Called to select the given task
  $scope.selectServiceItem = function(serviceItem) {
    $scope.selectedServiceItem = serviceItem;
    ServiceItems.setSelected($scope.selectedServiceItem);
    $scope.showServiceItems = false
  };

   $scope.changeProjectSelection = function(){
    $scope.selectedProject = null
    $scope.selectedServiceItem = null
    $scope.showProjects = true
    $scope.showServiceItems = false

  }

  $scope.changeServiceItemSelection = function(){
    $scope.selectedServiceItem = null
    $scope.showServiceItems = true

  }

})


