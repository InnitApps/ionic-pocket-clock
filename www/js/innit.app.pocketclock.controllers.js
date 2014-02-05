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
        
        _activity.isVisible = true 

      });

    }
    else if(!$scope.selectedActivity.active){

      //if we're setting the selected activity to true, let's set the rest of them to false and hide them
      angular.forEach($scope.activities, function(_activity) {
        _activity.active = false  
        _activity.isVisible = false                   
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
    $scope.isOverhead = false
    $scope.activityModal.show();
  };

  // Close the new activity modal
  $scope.closeNewActivity = function() {
    $scope.activityModal.hide();
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


