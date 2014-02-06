//storage for app / auth /etc

var innitStorage = chrome.storage.local || window.localStorage;


(function () {

angular.module('innit.storage',[])

.factory('$authStorage',function(){



	return {
		foo : 'bar'
	}


})

.factory('$appStorage',function(){




	return {

		
	}

})



})(innitStorage);