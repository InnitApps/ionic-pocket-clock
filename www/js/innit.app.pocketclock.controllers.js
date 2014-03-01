var pocketClock = angular.module('innit.app.pocketclock.controllers',['innit.app.pocketclock.factories','innit.app.pocketclock.filters','ngAnimate']);

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
        $scope.selectedLogFactoryModel.setToDefault()
        $scope.timeLogModal.show();
      }
    }
  ]

  $scope.timeLogs = TimeLogs.all();
  $scope.projects = Projects.all();
  $scope.serviceItems = ServiceItems.all();

  // $scope.selectedTimeLog = $scope.timeLogs[0]
  
  // $scope.$watch('selectedTimeLog',function(log){

  //   if(!log.endTime){

  //     $scope.selectedTimeLog.isActive = true

  //     angular.forEach($scope.timeLogs, function(_log) { 
        
  //       _log.isVisible = false 

  //     });

  //     $scope.selectedTimeLog.isVisible = true

  //   }
  //   else{
      
  //     angular.forEach($scope.timeLogs, function(_log) { 
        
  //       _log.isVisible = true 

  //     });
  //   }
    
  // })


  $scope.resumeTimeLog = function(timeLog){

    // //returns a blank time log prototype to work with
    // var newTimeLog = TimeLogs.newTimeLog();

    // if($scope.selectedTimeLog.jobId){
    //   TimeLogs.setProject(newTimeLog,$scope.selectedTimeLog)
    // }
    
    // TimeLogs.setServiceItem(newTimeLog,$scope.selectedTimeLog)
    // TimeLogs.registerTimeLog(newTimeLog)
    // newTimeLog.startDate = new Date();
    // $scope.timeLogs.unshift(newTimeLog)
  }

  $scope.endTimeLog = function(log){ 
    console.log(log)

    log.endTime = new Date();
    log.isActive = false
    // TimeClock.refreshTimeClock();
  }

  // Create and load the Modal
  $ionicModal.fromTemplateUrl('partials/modal.new-timelog.html', function(modal) {
    $scope.timeLogModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  $scope.newTimeLog = {
    itemId: null,
    itemName: null,
    jobId: null,
    jobName: null,

  }

  // Called when the form is submitted
  $scope.createTimeLog = function(timeLog) {
    
    var newTimeLog = {
    employeeId: "QB:123",
    vendor: "Vendor Name",
    customerId: "Customer ID",
    itemId: timeLog.itemId,
    itemName: timeLog.itemName,
    jobId: timeLog.jobId,
    jobName: timeLog.jobName,
    startTime: new Date(),
    endTime: null
  }
    
    console.log(newTimeLog)
    newTimeLog.isActive = true
    $scope.timeLogs.push(newTimeLog)
    $scope.timeLogModal.hide();
  };

  // Close the new time log modal
  $scope.closeNewTimeLog = function() {
    $scope.timeLogModal.hide();
  };

  //Modal

  

  $scope.logFactoryModel = [
    {
      type: "Billable",
      setToDefault: function(){
        $scope.newTimeLog.jobId = null
        $scope.newTimeLog.jobName = null
        $scope.newTimeLog.itemId = null
        $scope.newTimeLog.itemName = null
      }
    },
    {
      type: "Overhead",
      setToDefault: function(){
        $scope.newTimeLog.jobId = null
        $scope.newTimeLog.jobName = null
        $scope.newTimeLog.itemId = null
        $scope.newTimeLog.itemName = null
      }
    }
  ]

  $scope.selectedLogFactoryModel = $scope.logFactoryModel[0]



})

