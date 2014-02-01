var pocketClock = angular.module('innit.app.pocketclock.controllers',['innit.app.pocketclock.factories']);

// pocketClock.controller('NavigationCtrl',function($rootScope,$scope,$state){
  
//   console.log("Hello Navigation Controller!")

// })

pocketClock.controller('ActivityListCtrl',function($rootScope,$scope,$state,Activities){
  
  console.log("Hello Activity List Controller!")

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
      	console.log("let's create a new activity")
      	$state.go('activityFactory')
      }
    }
  ]

    // Load or initialize activity logs
  $scope.activities = Activities.all();

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


})

pocketClock.controller('ActivityFactoryCtrl',function($rootScope,$scope,$state, $timeout, $ionicModal,Projects,ServiceItems){
  
  console.log("Hello Factory Controller!")

   $scope.isOverhead = false;
   $scope.selectedProject = null
   $scope.selectedServiceItem = null

   $scope.leftButtons = [
    { 
      type: 'button-clear',
      content: 'Cancel',
      tap: function(e) {
        $state.go('activityList')
        $scope.selectedProject = null
        $scope.selectedServiceItem = null

        Projects.setSelected($scope.selectedProject)
        ServiceItems.setSelected($scope.selectedServiceItem)
      }
    }
  ];

  $scope.rightButtons = [
    { 
      type: 'button-clear',
      content: 'Toggle',
      tap: function(e) {
        console.log("toggle overhead/billable")
        $scope.isOverhead = !$scope.isOverhead
        $scope.selectedProject = null
        $scope.selectedServiceItem = null

        Projects.setSelected($scope.selectedProject)
        ServiceItems.setSelected($scope.selectedServiceItem)
        
      }
    }
  ]


  // Load or initialize projects and service items
  $scope.projects = Projects.all();
  $scope.serviceItems = ServiceItems.all();

  // Grab the last active, or the first project
  // $scope.activeProject = $scope.projects[Projects.getLastActiveIndex()];

  // Called to create a new project
  // $scope.newProject = function() {
  //   var projectTitle = prompt('Project name');
  //   if(projectTitle) {
  //     createProject(projectTitle);
  //   }
  // };

  // Called to select the given project
  $scope.selectProject = function(project) {
    $scope.selectedProject = project;
    Projects.setSelected($scope.selectedProject);
  };

  // Called to select the given task
  $scope.selectServiceItem = function(serviceItem) {
    $scope.selectedServiceItem = serviceItem;
    ServiceItems.setSelected($scope.selectedServiceItem);
  };

  $scope.$watch('selectedServiceItem',function(_svcItem){
    
    console.log(_svcItem)

    if(_svcItem){
      $state.go('activityConfirm')
    }
  })



  // Create our modal
  // $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
  //   $scope.taskModal = modal;
  // }, {
  //   scope: $scope
  // });

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
  $timeout(function() {
    if($scope.projects.length == 0) {
      while(true) {
        var projectTitle = prompt('Your first project title:');
        if(projectTitle) {
          createProject(projectTitle);
          break;
        }
      }
    }
  });

})

pocketClock.controller('ActivityConfirmCtrl',function($rootScope,$scope,$state,Activities,Projects,ServiceItems){
  
  console.log("Hello Activity Confirm Controller!")

   $scope.leftButtons = [
    { 
      type: 'button-clear',
      content: 'Cancel',
      tap: function(e) {
        $state.go('activityList')
      }
    }
  ];

  $scope.selectedProject = Projects.getSelected();
  $scope.selectedServiceItem = ServiceItems.getSelected();

  $scope.confirmSelections = function(){
    var newActivity = Activities.newActivity();
    if($scope.selectedProject){
      Activities.setActivityProject(newActivity,$scope.selectedProject)
    }
    
    Activities.setActivityServiceItem(newActivity,$scope.selectedServiceItem)
    newActivity.startTime = new Date();

    console.log(newActivity)

    Activities.registerActivity(newActivity).then(function(_activity){
      var activities = Activities.all()
      activities.push(_activity)
      Activities.setCurrentActivity(_activity);
      $state.go('clock')
    })    
  }

  $scope.changeProjectSelection = function(){
    $scope.selectedProject = null
    $state.go('activityFactory')

  }

  $scope.changeServiceItemSelection = function(){
    $scope.selectedServiceItem = null
    $state.go('activityFactory')
  }

})

pocketClock.controller('ClockCtrl',function($rootScope,$scope,$state,Activities){
  
  console.log("Hello Clock Controller!")

  $scope.currentActivity = Activities.getCurrentActivity();

  $scope.endActivity = function(activity){
    activity.endTime = new Date();
    $state.go('activityList')
  }

})

pocketClock.controller('ActivityDetailCtrl',function($rootScope,$scope,$state){
  
  console.log("Hello Activity Detail Controller!")

  $scope.rightButtons = [
    { 
      type: 'button-clear',
      content: 'Edit',
      tap: function(e) {
        
      }
    }
  ]

  $scope.restartActivity = function(){
    $state.go('clock')
  }

})

