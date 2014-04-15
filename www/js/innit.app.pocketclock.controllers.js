var pocketClock = angular.module('innit.app.pocketclock.controllers',['innit.app.pocketclock.factories','innit.app.pocketclock.filters','ngAnimate']);

// pocketClock.controller('NavigationCtrl',function($rootScope,$scope,$state){
  
//   console.log("Hello Navigation Controller!")

// })

pocketClock.controller('TimeLogListCtrl',function($rootScope,$scope,$state,TimeClock,TimeLogs,Projects,ServiceItems,$ionicModal){
  
  console.log("Hello Time Log List Controller!")

  $scope.timeLogs = [
    {
           "id": 100,
           "employeeId": "QB:123",
           "vendor" : "Vendor One",
           "customerId": "201",
           "customerName": "Customer One",
           "itemId" : {
              "columnName" : "301",
              "type" : "Some Item Type"
            },
            "itemName" : "Mechanical Engineering",
            "jobId" : null,
            "jobName" : null,
            "startTime": "2014-04-09T10:57:05.000Z",
            "endTime": "2014-04-09T10:59:05.000Z"
          },
          {
           "id": 101,
           "employeeId": "QB:123",
           "vendor" : "Vendor Two",
           "customerId": "202",
           "customerName": "Customer Two",
           "itemId" : {
              "columnName" : "302",
              "type" : "Some Item Type"
            },
            "itemName" : "Pipe Fitting",
            "jobId" : {
              "columnName" : "402",
              "type" : "Some Job Type"
            },
            "jobName" : "3MM Amine Plant",
            "startTime": "2014-04-09T15:57:05.000Z",
            "endTime": "2014-04-09T15:59:05.000Z"
          },
          {
           "id": 102,
           "employeeId": "QB:123",
           "vendor" : "Vendor Three",
           "customerId": "203",
           "customerName": "Customer Three",
           "itemId" : {
              "columnName" : "303",
              "type" : "Some Item Type"
            },
            "itemName" : "Welding",
            "jobId" : {
              "columnName" : "403",
              "type" : "Some Job Type"
            },
            "jobName" : "3MM Amine Plant",
            "startTime": "2014-04-09T16:57:05.000Z",
            "endTime": "2014-04-09T16:59:05.000Z"
          }

  ]
  $scope.projects = Projects.all();
  $scope.serviceItems = ServiceItems.all();

   
  // TimeLogs.selectedTimeLog = TimeLogs.getLastActiveTimeLog();

  $scope.$watch('timeLogs[0]',function(log){

    // console.log(log)
    
    log.active = TimeLogs.checkActiveStatus(log)
    
    if(log.active){
      console.log("Log is Active!")
      TimeLogs.setSelected(log)
      $state.go('timeLog')
    }
    
  })

  $scope.select = function(log){
    TimeLogs.selectedTimeLog = log
    $state.go('timeLog')
  }

  //modal stuff
  $scope.newTimeLog = {
    itemId: null,
    itemName: null,
    jobId: null,
    jobName: null,
    isBillable: true,
    visible: false
  }

  $scope.modalLists = [
    {
      title: "Service Items",
      collection: $scope.serviceItems,
      onSelect: function(item){
        console.log(item)
        $scope.newTimeLog.itemId = item.id
        $scope.newTimeLog.itemName = item.description
        this.visible = false
        $scope.newTimeLog.visible = true
      },
      visible: true
    },
    {
      title: "Projects",
      collection: $scope.projects,
      onSelect: function(item){
        console.log("Project Selected")
        $scope.newTimeLog.jobId = item.id
        $scope.newTimeLog.jobName = item.name
        this.visible = false
        $scope.newTimeLog.visible = true
      },
      visible: false
    },

  ]

  $scope.resetTimeLogModal = function(){
   
      $scope.newTimeLog.itemId = null
      $scope.newTimeLog.itemName = null
      $scope.newTimeLog.jobId = null
      $scope.newTimeLog.jobName = null
      $scope.newTimeLog.isBillable = true
      $scope.newTimeLog.visible = false


     $scope.modalLists[0].visible = true
     $scope.modalLists[1].visible = false
  }

  // Create and load the Modal
  $ionicModal.fromTemplateUrl('partials/modal.newer-timelog.html', function(modal) {
    $scope.timeLogModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up',
    focusFirstInput: true
  });

  

  // Called when the form is submitted
  $scope.startNewTimeLog = function(newTimeLog) {
    
    newLog = {
      employeeId: "QB:123",
      vendor: "Vendor Name",
      customerId: "Customer ID",
      itemId: newTimeLog.itemId,
      itemName: newTimeLog.itemName,
      jobId: newTimeLog.jobId,
      jobName: newTimeLog.jobName,
      startTime: new Date(),
      endTime: null
    }

    $scope.timeLogs.unshift(newLog)
    $scope.timeLogModal.hide();
    $scope.timeLogModal.remove();

  };

 

})

pocketClock.controller('TimeLogCtrl',function($rootScope,$scope,$state,TimeClock,TimeLogs,Projects,ServiceItems){

  console.log("Hello Time Log List Controller!")

  $scope.selectedTimeLog = TimeLogs.getSelected()

  $scope.endTimeLog = function(log){
    log.endTime = new Date();
    log.active = false

    $state.go("timeLogList")
  }

  $scope.resumeTimeLog = function(){

    
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
})



