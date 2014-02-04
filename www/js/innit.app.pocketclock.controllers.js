var pocketClock = angular.module('innit.app.pocketclock.controllers',['innit.app.pocketclock.factories']);

// pocketClock.controller('NavigationCtrl',function($rootScope,$scope,$state){
  
//   console.log("Hello Navigation Controller!")

// })

pocketClock.controller('ActivityListCtrl',function($rootScope,$scope,$state,Activities,Projects,ServiceItems,$ionicModal){
  
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
      	// $state.go('activityFactory')
        $scope.newActivity()
      }
    }
  ]

  $scope.activities = Activities.all();
  $scope.projects = Projects.all();
  $scope.serviceItems = ServiceItems.all();

  $scope.selectedProject = null
  $scope.selectedServiceItem = null

  $scope.showProjects = true
  $scope.showServiceItems = false
  $scope.showOverhead = false

  $scope.$watch('selectedActivity.active',function(val){
    
    if(val){

      angular.forEach($scope.activities, function(_activity) { 
        
        _activity.isVisible = true 

      });

      $scope.selectedActivity.isVisible = false
    }
    else{
      
      angular.forEach($scope.activities, function(_activity) { 
        
        _activity.isVisible = false 

      });
    }
  })

  $scope.toggleActivity = function(activity){

    $scope.selectedActivity = activity

    if($scope.selectedActivity.active){

      $scope.selectedActivity.active = false
      
      angular.forEach($scope.activities, function(_activity) { 
        
        _activity.visible = true 

      });

    }
    else if(!$scope.selectedActivity.active){

      //if we're setting the selected activity to true, let's set the rest of them to false and hide them
      angular.forEach($scope.activities, function(_activity) {
        _activity.active = false  
        _activity.visible = false                   
      });

      $scope.selectedActivity.active = true

    }

  }

  // Create and load the Modal
  $ionicModal.fromTemplateUrl('new-activity.html', function(modal) {
    $scope.activityModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  // Called when the form is submitted
  $scope.createActivity = function(activity) {
    $scope.activities.push(activity);
    $scope.activityModal.hide();
  };

  // Open our new activity modal
  $scope.newActivity = function() {
    console.log("show the modal")
    $scope.selectedProject = null
    $scope.selectedServiceItem = null
    $scope.toggleOverhead.value = false
    $scope.activityModal.show();
  };

  // Close the new activity modal
  $scope.closeNewActivity = function() {
    $scope.activityModal.hide();
  };

  //Modal Stuff

  $scope.toggleOverhead = {
    value: false,
    buttonText: "Overhead",
    titleText: "Billable"
  };

  // Called to select the given project
  $scope.toggleOverhead = function() {

        $scope.toggleOverheadButton.value = !$scope.toggleOverhead.value
        if( $scope.toggleOverhead.value = true){
           $scope.toggleOverhead.text = "Billable"
        }
        else{
           $scope.toggleOverhead.value
        }
        $scope.selectedProject = null
        $scope.selectedServiceItem = null
  };

  $scope.$watch('toggleOverhead.value',function(val){
    if(val == true){
      $scope.toggleOverhead.buttonText = "Billable"
      $scope.toggleOverhead.titleText = "Overhead"
      $scope.showProjects = false
      $scope.showServiceItems = true

    }
    else{
      $scope.showProjects = true
      $scope.showServiceItems = false
      $scope.toggleOverhead.buttonText = "Overhead"
      $scope.toggleOverhead.titleText = "Billable"
    }
    
    $scope.selectedProject = null
    $scope.selectedServiceItem = null

  })


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

