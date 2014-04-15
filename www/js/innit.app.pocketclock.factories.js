var pocketClock = angular.module('innit.app.pocketclock.factories',[]);

pocketClock.factory('TimeClock', function(TimeLogs,Projects,ServiceItems) {
  return {
    refreshTimeClock: function(){

      TimeLogs.all()
      Projects.all()
      ServiceItems.all()

    }
  }
});

/**
 * The Activity factory handles saving and loading activity logs
 * from local storage
 */
pocketClock.factory('TimeLogs', function($q,$timeout) {
  return {
    all: function() {

      return [
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
    },
    checkActiveStatus: function(timeLog){
      if(timeLog.startTime && !timeLog.endTime){

        return true
      
      }
      else{
        
        return false
        
      }
    },





    getLastActiveTimeLog: function(){
      var logs = this.all()
      var lastLog = logs[0]

      if(!lastLog.endTime){
        lastLog.active = true

        console.log("Last Time Log is active!")
        return lastLog
      }
      else{
        console.log("No Active Log...")
        return false
      }

    },
    setAsActive: function(timeLog){
      timeLog.active = true

    },
    setSelected: function(timeLog){
      this.selectedTimeLog = timeLog
    },
    getSelected: function(){
      return this.selectedTimeLog
    },
    registerTimeLog: function(timeLog) {
        var deferred = $q.defer();

        
          deferred.resolve(

              timeLog

          );
       

        return deferred.promise
    },
    newTimeLog: function() {
      return {
        employeeId: "QB:123",
        vendor: "Vendor Name",
        customerId: "Customer ID",
        itemId: {
          columnName: null,
          type: "Service"
        },
        itemName: null,
        jobId: {
          columnName: null,
          type: "Job Type"
        },
        jobName: null,
        startTime: null,
        endTime: null
      };
    },
    setProject: function(log,object){
      if(object.jobId){
        log.jobId = object.jobId
      }
      if(object.jobName){
        log.jobName = object.jobName
      }
      else{
        log.jobId = object.id
        log.jobName = object.name
      }
      
      return log

    },
    setServiceItem: function(log,object){

      if(object.itemId){
        log.itemId = object.itemId
      }
      if(object.itemName){
        log.itemName = object.itemName
      }
      else{
        //for setting the log from the job/item modal
        log.itemId = object.id
        log.itemName = object.description
      }
      

      return log
    },
    // setCurrentActivity: function(activity){
    //   this.currentActivity = activity
    // },
    // getCurrentActivity: function(){
    //   if(this.currentActivity){
    //     return this.currentActivity
    //   }
    //   else{
    //     console.log("no current activity")
    //     return false
    //   }
    // },
    // cloneActivity: function(activity){
    //   var newActivity = this.newActivity();
    //   newActivity.jobId = activity.jobId
    //   newActivity.jobName = activity.jobName
    //   newActivity.itemId = activity.itemId
    //   newActivity.itemName = activity.itemName

    //   return newActivity
    // }
    // ,
    // getLastActiveIndex: function() {
    //   return parseInt(window.localStorage['lastActiveActivity']) || 0;
    // },
    // setLastActiveIndex: function(index) {
    //   window.localStorage['lastActiveActivity'] = index;
    // }
  }
});

/**
 * The Projects factory handles saving and loading projects
 * from local storage, and also lets us save and load the
 * last active project index.
 */
pocketClock.factory('Projects', function() {
  return {
    all: function() {
      // var projectString = window.localStorage['projects'];
      // if(projectString) {
      //   return angular.fromJson(projectString);
      // }
      // return [];

      return [
        {
          "name": "JobOne",
          "customer": null,
          "customerName": null,
          "id": 2,
          "createdAt": "2013-11-13T23:51:32.000Z",
          "updatedAt": "2013-11-13T23:51:32.000Z",
          "showInTimeClock": null
        },
        {
          "name": "JobTwo",
          "customer": null,
          "customerName": null,
          "id": 3,
          "createdAt": "2013-11-13T23:51:37.000Z",
          "updatedAt": "2013-11-13T23:51:37.000Z",
          "showInTimeClock": null
        },
        {
          "name": "JobThree",
          "customer": null,
          "customerName": null,
          "id": 4,
          "createdAt": "2013-11-13T23:51:41.000Z",
          "updatedAt": "2013-11-13T23:51:41.000Z",
          "showInTimeClock": null
        },
        {
          "name": "JobFour",
          "customer": null,
          "customerName": null,
          "id": 5,
          "createdAt": "2013-11-13T23:51:45.000Z",
          "updatedAt": "2013-11-13T23:51:45.000Z",
          "showInTimeClock": null
        },
        {
          "name": "JobFive",
          "customer": null,
          "customerName": null,
          "id": 6,
          "createdAt": "2013-11-13T23:51:50.000Z",
          "updatedAt": "2013-11-13T23:51:50.000Z",
          "showInTimeClock": null
        }
      ]


    },
    save: function(projects) {
      window.localStorage['projects'] = angular.toJson(projects);
    },
    newProject: function(projectTitle) {
      // Add a new project
      return {
        title: projectTitle,
        tasks: []
      };
    },
    setSelected: function(project) {
      if(project){
        this.selectedProject = project
      }
      else{
        this.selectedProject = null
      }
      
    },
    getSelected: function() {
      return this.selectedProject
    }
    // getLastActiveIndex: function() {
    //   return parseInt(window.localStorage['lastActiveProject']) || 0;
    // },
    // setLastActiveIndex: function(index) {
    //   window.localStorage['lastActiveProject'] = index;
    // }
  }
});

/**
 * The ServiceItems factory handles saving and loading service items
 * from local storage, and also lets us save and load the
 * last active service item index.
 */
pocketClock.factory('ServiceItems', function() {
  return {
    all: function() {
      // var svcItemString = window.localStorage['svcItems'];
      // if(svcItemString) {
      //   return angular.fromJson(svcItemString);
      // }
      // return [];

      return [
        {
          "active": true,
          "parentId": 5,
          "name": "500",
          "description": "ItemOne",
          "itemType": "Service",
          "id": 5,
          "createdAt": "2013-11-12T22:24:25.000Z",
          "updatedAt": "2013-11-12T22:24:25.000Z"
        },
        {
          "active": true,
          "parentId": 6,
          "name": "502",
          "description": "ItemTwo",
          "itemType": "Service",
          "id": 6,
          "createdAt": "2013-11-12T22:24:38.000Z",
          "updatedAt": "2013-11-12T22:24:38.000Z"
        },
        {
          "active": true,
          "parentId": 7,
          "name": "503",
          "description": "ItemThree",
          "itemType": "Service",
          "id": 7,
          "createdAt": "2013-11-12T22:24:47.000Z",
          "updatedAt": "2013-11-12T22:24:47.000Z"
        },
        {
          "active": true,
          "parentId": 8,
          "name": "504",
          "description": "ItemFour",
          "itemType": "Service",
          "id": 8,
          "createdAt": "2013-11-13T23:48:54.000Z",
          "updatedAt": "2013-11-13T23:48:54.000Z"
        },
        {
          "active": true,
          "parentId": 9,
          "name": "505",
          "description": "ItemFive",
          "itemType": "Service",
          "id": 9,
          "createdAt": "2013-11-13T23:49:03.000Z",
          "updatedAt": "2013-11-13T23:49:03.000Z"
        }

      ]

    },
    save: function(svcItems) {
      window.localStorage['svcItems'] = angular.toJson(svcItems);
    },
    newSvcItem: function(svcItemTitle) {
      // Add a new project
      return {
        title: svcItemTitle,
        tasks: []
      };
    },
    setSelected: function(serviceItem) {
      if(serviceItem){
        this.selectedServiceItem = serviceItem
      }
      else{
        this.selectedServiceItem = null
      }
      
    },
    getSelected: function() {
      return this.selectedServiceItem
    }
    // getLastActiveIndex: function() {
    //   return parseInt(window.localStorage['lastActiveSvcItem']) || 0;
    // },
    // setLastActiveIndex: function(index) {
    //   window.localStorage['lastActiveSvcItem'] = index;
    // }
  }
});

pocketClock.factory('TimeClockAPI',function($http,$innitAPI){

  //private storage of jobs
  

  //private storage of service items
  
  



  var _Employee = new $innitAPI('api/employee')
  var _ServiceItem = new $innitAPI('api/operationcode')
  var _Job = new $innitAPI('api/project')
  var _TimeLog = new $innitAPI('api/timelog')

  var _liveData = {

    jobs : _Job.query(),
    employees : _Employee.query(),
    operationcodes : _ServiceItem.query(),
    timelogs : _TimeLog.query()

  }


  

  return {
    
    live : _liveData,
    clockIn : function(timeLog){

      var newTimeLog = new _TimeLog(timeLog)

      newTimeLog.save(function(log){

        _liveData.timelogs.push(log)


      })

    }
  
  }






})
