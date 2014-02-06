angular.module('innit.app',['ionic','innit.auth','innit.storage'])


.provider('$innitApp',function(){

	var _appConfig = {
		baseUrl : 'http://localhost:1337'
	}


	_appState = {
		stateDescription : null

	}


	return {

		$get : function(){
			return {

				config : _appConfig,
				state  : _appState,
				launchParams : function(){}


			}
		},

		setBaseUrl : function(baseUrl){

			_appConfig.baseUrl = baseUrl;

		}

	}


})


.run(function($location,$innitApp){

	
	
	$innitApp.launchParams = $location.search()




})


.config(function($stateProvider){

	$stateProvider.state('app',{
		abstract : true,
		controller : 'AppController',
		templateUrl : 'views/innit.app.html',
		url : '/app'
	})

	$stateProvider.state('app.launcher',{
      url : '/launch',
      templateUrl : 'views/launcher.html',
      controller : 'AppLaunchController'
    })

	$stateProvider.state('app.login',{
		controller : 'AppLoginController',
		templateUrl : 'partials/innit.app.login.html',
		url : '/login'
	})




})

.controller('AppController',function($scope,$location){

	console.log('hello app controller')
	

})

.controller('AppLaunchController',function($scope,$state,$timeout,$innitApp,$innitAuth,$ionicLoading){

	
	$scope.showLogin = false;
  // Trigger the loading indicator
  $scope.show = function() {

    // Show the loading overlay and text
    $scope.loading = $ionicLoading.show({

      // The text to display in the loading indicator
      content: '<div class="row"><div class="col col-center"><i class="icon ion-looping"></i></div></div><div class="row"><div class="col col-center"><p>Loading...</p></div></div>',

      // The animation to use
      animation: 'fade-in',

      // Will a dark overlay or backdrop cover the entire view
      showBackdrop: false,

      // The maximum width of the loading indicator
      // Text will be wrapped if longer than maxWidth
      maxWidth: 200,

      // The delay in showing the indicator
      showDelay: 100
    });
  };

  // Hide the loading indicator
  $scope.hide = function(){
    $scope.loading.hide();
  };

	//connect socket

	//$innitAuth.getGoogleToken()
	//do some shit

	
	
	



	$scope.signInWithGoogle = function(){

		$scope.show()


		

		var token = $innitAuth.getGoogleToken().then(function(token){
			console.log(token)

			if(token){

				
				$timeout(function(){
					$scope.hide()

					$state.go('app.pocketclock.activityList')

				},1000)

				
			}

		})

		


	}

	$timeout(function(){
					//$scope.hide()
$scope.showLogin = true;
					//$state.go('app.pocketclock.activityList')

				},2000)
})



.controller('AppLoginController',function($innitAuth){

	$scope.userObject = {}



	

	


})



