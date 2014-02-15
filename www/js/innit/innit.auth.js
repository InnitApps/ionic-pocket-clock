angular.module('innit.auth',[])


.factory('$innitAuthStorage',function(){







})


.factory('$innitAuth',function($http,$innitApp,$injector,$q){

	var redirect_uri= 'https://' + chrome.runtime.id + '.chromiumapp.org/'

	console.log(chrome.identity)
	//dont store username and password here!
 	var authCreds = {

 		google : {
 			profile : undefined,
 			token : undefined,
 			tokenInfo : undefined
 		}

	};
	


	function parseKeyValue(keyValue) {
      var obj = {}, key_value, key;
      angular.forEach((keyValue || "").split('&'), function(keyValue){
        if (keyValue) {
          key_value = keyValue.split('=');
          key = decodeURIComponent(key_value[0]);
          obj[key] = angular.isDefined(key_value[1]) ? decodeURIComponent(key_value[1]) : true;
        }
      });
      return obj;
    }

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


	
	function _connect(done){

		var deferred = $q.defer()

		var url = 'http://localhost:5000/authorize?client_id=e10ddf9a-41c2-4d7d-b569-d1b56ecaa602&response_type=token&redirect_uri='+ redirect_uri +'&scope=https://api.innit.io/api/v1/domain/mcguffygroup/users/me'

		chrome.identity.launchWebAuthFlow({url : url, interactive : true},function(result){
			
			if(!result){
				deferred.reject()
			}
			else{
				console.log(result)
				//console.log(typeof result)
				var data = parseKeyValue(result.split('#')[1])


				console.log(data)

				deferred.resolve(data)
			}


		})

		return deferred.promise;

	}


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
		getGoogleToken : _getGoogleToken,
		connectToInnit : _connect
		//token : _token
	}




})