angular.module('innit.auth',[])



.factory('$innitAuth',function($http,$innitApp,$injector,$q){

	//dont store username and password here!
 	var authCreds = {

 		google : {
 			profile : undefined,
 			token : undefined,
 			tokenInfo : undefined
 		}

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

				authCreds.google.token = token;

				_getGoogleUser(token)


				deferred.resolve(token)
			}
			else{
				deferred.reject()
			}
			
			// if(token){
			// 	console.log('google token found: ' + token)

			// 	$http.defaults.useXDomain = true;
			// 	$http.defaults.headers.common['X-AUTH-TOKEN'] = token;

				

			// 	$http.post($innitApp.config.baseUrl + '/api/tokeninfo').success(function(res){
			// 		console.log(res)
			// 		deferred.resolve(res)
			// 	})

				
			// }
			// else{
			// 	console.log('no token found')
			// 	deferred.reject('no token found')
			// }

		})

		return deferred.promise;

	}

	function _getGoogleTokenInfo(token){

		$http.get('https://www.googleapis.com/oauth2/v1/tokeninfo',{params :{access_token : token}}).then(function(response){


			authCreds.google.tokenInfo = response.data;


		},function(){})

	}


	function _getGoogleUser(token){

		$http.get('https://www.googleapis.com/plus/v1/people/me',{params :{access_token : token}}).then(function(response){


			authCreds.google.profile = response.data;


		},function(){})

	}


	return {

		isAuthorized : false,
		getGoogleToken : _getGoogleToken
		//token : _token
	}




})