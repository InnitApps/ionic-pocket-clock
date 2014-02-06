var pocketClock = angular.module('innit.app.pocketclock.controllers',['innit.app.pocketclock.factories']);

// pocketClock.controller('NavigationCtrl',function($rootScope,$scope,$state){
  
//   console.log("Hello Navigation Controller!")

// })

pocketClock.controller('TimeLogListCtrl',function($rootScope,$scope,$state,TimeClock,TimeLogs,Projects,ServiceItems,$ionicModal){
  
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


  $scope.$watch('timeLogs[0]',function(_log){
    
    console.log(_log)
    if(!_log.endTime){
      _log.isActive = true
      // TimeClock.activeTimeLog = _log
      
    }
    else{
      _log.isActive = false

    }

  })



  $scope.$watch('selectedTimeLog.isActive',function(active){

    if(active){

      angular.forEach($scope.timeLogs, function(_log) { 
        
        _log.isDisabled = true
      
      });

      $scope.selectedTimeLog.isDisabled = false

    }
    else if(!active){

      angular.forEach($scope.timeLogs, function(_log) { 
        
        _log.isDisabled = false

      });
    }
    else{
      angular.forEach($scope.timeLogs, function(_log) { 
        
        _log.isDisabled = false

      });
    }
  })

  

  $scope.toggleTimeLog = function(timeLog){
    $scope.selectedTimeLog = timeLog
    // //toggle the value
    // $scope.selectedTimeLog.isActive = !$scope.selectedTimeLog.isActive
    
    //disable all other toggles based on a truthy active value
    // if($scope.selectedTimeLog.isActive){

    //   angular.forEach($scope.timeLogs, function(_log) { 
        
    //     _log.isDisabled = true
    //     _log.isActive = false 

    //   });

    //   $scope.selectedTimeLog.isDisabled = false
    //   $scope.selectedTimeLog.isActive = true

    // }
    // else if(!$scope.selectedTimeLog.isActive){

    //   angular.forEach($scope.timeLogs, function(_log) {

    //     _log.isDisabled = false
    //     _log.isActive = false                   
    //   });

    // }
  }

  $scope.resumeTimeLog = function(timeLog){

    //returns a blank time log prototype to work with
    var newTimeLog = TimeLogs.newTimeLog();

    if($scope.selectedTimeLog.jobId){
      TimeLogs.setProject(newTimeLog,$scope.selectedTimeLog)
    }
    
    TimeLogs.setServiceItem(newTimeLog,$scope.selectedTimeLog)
    // TimeLogs.registerTimeLog(newTimeLog)
    newTimeLog.startDate = new Date();
    $scope.timeLogs.unshift(newTimeLog)
  }

  $scope.endTimeLog = function(log){

    log.endTime = new Date();
    log.isActive = false
    TimeClock.refreshTimeClock();
  }

  // Create and load the Modal
  $ionicModal.fromTemplateUrl('new-timelog.html', function(modal) {
    $scope.timeLogModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  // Called when the form is submitted
  $scope.createTimeLog = function() {
    
    //returns a blank time log prototype to work with
    var newTimeLog = TimeLogs.newTimeLog();

    //TODO: should turn this into chained promises...
    TimeLogs.setProject(newTimeLog,Projects.getSelected())
    TimeLogs.setServiceItem(newTimeLog,ServiceItems.getSelected())
    // TimeLogs.registerTimeLog(newTimeLog)
    newTimeLog.startTime = new Date();
    $scope.timeLogs.unshift(newTimeLog)
    $scope.timeLogModal.hide();
  };

  // Open our new time log modal
  $scope.newTimeLog = function() {
    console.log("show the modal")
    $scope.selectedProject = null
    $scope.selectedServiceItem = null
    $scope.showProjects = true
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

  // Called to select the given service item
  $scope.selectServiceItem = function(serviceItem) {
    $scope.selectedServiceItem = serviceItem;
    ServiceItems.setSelected($scope.selectedServiceItem);

    $scope.showProjects = false
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


