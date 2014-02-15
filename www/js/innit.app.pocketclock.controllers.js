var pocketClock = angular.module('innit.app.pocketclock.controllers',['innit.app.pocketclock.factories']);

// pocketClock.controller('NavigationCtrl',function($rootScope,$scope,$state){
  
//   console.log("Hello Navigation Controller!")

// })

<<<<<<< HEAD
pocketClock.controller('TimeLogListCtrl',function($rootScope,$scope,$state,TimeClock,TimeLogs,Projects,ServiceItems,$ionicModal){
  
  console.log("Hello Time Log List Controller!")
=======




pocketClock.controller('ActivityListCtrl',function($rootScope,$scope,$state){
  

  console.log("Hello Activity List Controller!")
>>>>>>> rob-dev

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

<<<<<<< HEAD
  $scope.timeLogs = TimeLogs.all();
  $scope.projects = Projects.all();
  $scope.serviceItems = ServiceItems.all();
=======
    // Load or initialize activity logs
 // $scope.activities = TimeClockAPI.live.timelogs;

    // Called to select the given activity
  // $scope.selectActivity = function(activity) {
  //   $scope.selectedActivity = activity;
  //   console.log("selected:")
  //   console.log($scope.selectedActivity)
  // };

   $scope.resumeActivity = function(activity) {
    $scope.selectedActivity = activity;
    var newActivity = Activities.cloneActivity($scope.selectedActivity);
    Activities.registerActivity(newActivity).then(function(_activity){
      var activities = Activities.all()
      activities.push(_activity)
      Activities.setCurrentActivity(_activity);
      $state.go('clock')
    }) 
  };
>>>>>>> rob-dev


  $scope.$watch('timeLogs[0]',function(_log){
    
    console.log(_log)
    if(!_log.endTime){
      _log.isActive = true
      // TimeClock.activeTimeLog = _log
      
    }
    else{
      _log.isActive = false

<<<<<<< HEAD
    }

  })
=======
pocketClock.controller('ActivityFactoryCtrl',function($rootScope,$scope,$state, $timeout, $ionicModal,Projects,ServiceItems,TimeClockAPI){
  
  console.log("Hello Factory Controller!")

  $scope.newTimeLog = {
    operationcode : undefined,
    project : undefined 
  }


>>>>>>> rob-dev



  // $scope.$watch('selectedTimeLog.isActive',function(active){

  //   if(active){

  //     angular.forEach($scope.timeLogs, function(_log) { 
        
  //       _log.isDisabled = true
      
  //     });

  //     $scope.selectedTimeLog.isDisabled = false

<<<<<<< HEAD
  //   }
  //   else if(!active){
=======
  // Load or initialize projects and service items
  $scope.projects = TimeClockAPI.live.projects;
  $scope.serviceItems = TimeClockAPI.live.operationcodes;
>>>>>>> rob-dev

  //     angular.forEach($scope.timeLogs, function(_log) { 
        
  //       _log.isDisabled = false

  //     });
  //   }
  //   else{
  //     angular.forEach($scope.timeLogs, function(_log) { 
        
  //       _log.isDisabled = false

<<<<<<< HEAD
  //     });
  //   }
  // })

  

  $scope.toggleTimeLog = function(timeLog){
    $scope.selectedTimeLog = timeLog
    //toggle the value
    $scope.selectedTimeLog.isActive = !$scope.selectedTimeLog.isActive
    
    //disable all other toggles based on a truthy active value
    if($scope.selectedTimeLog.isActive){
=======
  // Called to select the given project
  $scope.selectProject = function(project) {
    $scope.newTimeLog.project = project;
   
  };

  // Called to select the given task
  $scope.selectServiceItem = function(serviceItem) {
    $scope.newTimeLog.operationcode = serviceItem;
    
  };

  $scope.clockIn = function(){




    TimeClockAPI.clockIn($scope.newTimeLog)


  }
>>>>>>> rob-dev

      angular.forEach($scope.timeLogs, function(_log) { 
        
        _log.isDisabled = true
        _log.isActive = false 

      });

      $scope.selectedTimeLog.isDisabled = false
      $scope.selectedTimeLog.isActive = true

<<<<<<< HEAD
    }
    else if(!$scope.selectedTimeLog.isActive){
=======
  // $scope.createTask = function(task) {
  //   if(!$scope.activeProject) {
  //     return;
  //   }
  //   $scope.activeProject.tasks.push({
  //     title: task.title
  //   });
  //   $scope.taskModal.hide();

  //   // Inefficient, but save all the projects
  //   Projects.save($scope.projects);

  //   task.title = "";
  // };

  // $scope.newTask = function() {
  //   $scope.taskModal.show();
  // };

  // $scope.closeNewTask = function() {
  //   $scope.taskModal.hide();
  // }

  // $scope.toggleProjects = function() {
  //   $scope.sideMenuController.toggleLeft();
  // };


  // Try to create the first project, make sure to defer
  // this by using $timeout so everything is initialized
  // properly
  // $timeout(function() {
  //   if($scope.projects.length == 0) {
  //     while(true) {
  //       var projectTitle = prompt('Your first project title:');
  //       if(projectTitle) {
  //         createProject(projectTitle);
  //         break;
  //       }
  //     }
  //   }
  // });
>>>>>>> rob-dev

      angular.forEach($scope.timeLogs, function(_log) {

        _log.isDisabled = false
        _log.isActive = false                   
      });

    }
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


