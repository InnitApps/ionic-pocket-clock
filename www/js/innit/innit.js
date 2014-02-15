/**
 * Innit Core - should be loaded first for all innit projects.
 * 
 */

angular.module('innit',['innit.app','innit.auth'])


/**
 * Innit Core Provider
 */
.provider('$innit',function(){

	return {
		$get : function(){
			
		}
	}

})