angular.module('innit.auth',['innit.app'])

.factory('$innitAuth',function($http,$innitApp,$injector,$q){

	//dont store username and password here!
 	var authCreds = {

 		innitAccessToken : undefined,
 		googleAccessToken : undefined

	};
	


	function _getInnitTokenWithLocalCredentials(username,password,done){

		$http.post($innitApp.config.baseUrl + '/auth/local/token',loginUser).success(function(res){
			
			if(res.token){
				$http.defaults.useXDomain = true;
				$http.defaults.headers.common['X-AUTH-TOKEN'] = res.token;


				$http.get($innitApp.config.baseUrl + '/api/tokeninfo').success(function(res){
					$injector.get('TimeClockAPI')
				})
			}


		}).error(function(err){
			console.log(err)
			done(err)
		})}


	function _getGoogleToken(){

		var deferred = $q.defer()

		console.log('trying to get google token')


		chrome.identity.getAuthToken({interactive : true}, function(token){

			
			if(token){
				console.log('google token found: ' + token)

				$http.defaults.useXDomain = true;
				$http.defaults.headers.common['X-AUTH-TOKEN'] = token;

				

				$http.post($innitApp.config.baseUrl + '/api/tokeninfo').success(function(res){
					console.log(res)
					deferred.resolve(res)
				})

				
			}
			else{
				console.log('no token found')
				deferred.reject('no token found')
			}

		})

		return deferred

	}



	return {

		isAuthorized : false,
		//login : _login,
		getGoogleToken : _getGoogleToken,
		//token : _token
	}




})