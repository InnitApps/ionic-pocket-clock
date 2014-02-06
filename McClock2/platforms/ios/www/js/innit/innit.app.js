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
				state  : _appState


			}
		},

		setBaseUrl : function(baseUrl){

			_appConfig.baseUrl = baseUrl;

		}

	}


})


.run(function($location,$innitApp){

	console.log('innit.app run')
	
	$innitApp.launchParams = $location.search()




})

.controller('AppController',function($scope,$location){


	

})

.controller('AppLaunchController',function($scope,$state,$timeout,$innitApp,$innitAuth){

	$scope.appStore = $innitApp.state;

	//connect socket

	//$innitAuth.getGoogleToken()
	//do some shit

 	




	
})