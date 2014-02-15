'use strict';

/*
 * angular-google-plus-directive v0.0.1
 * ♡ CopyHeart 2013 by Jerad Bitner http://jeradbitner.com
 * Copying is an act of love. Please copy.
 */

angular.module('innit.auth.google', []).
  directive('googlePlusSignin', function () {
  return {
    restrict: 'E',
    template: '<span></span>',
    replace: true,
    link: function (scope, element, attrs) {

      // Set class.
      attrs.$set('class', 'g-signin');

      attrs.$set('data-clientid', attrs.clientid + '.apps.googleusercontent.com');

      // Some default values, based on prior versions of this directive
      var defaults = {
        callback: 'signinCallback',
        cookiepolicy: 'single_host_origin',
        requestvisibleactions: 'http://schemas.google.com/AddActivity',
        scope: 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
        width: 'wide'
      };

      // Provide default values if not explicitly set
      angular.forEach(Object.getOwnPropertyNames(defaults), function(propName) {
        if (!attrs.hasOwnProperty('data-' + propName)) {
          attrs.$set('data-' + propName, defaults[propName]);
        }
      });

    
    }
  };
}).run(['$window','$rootScope',function($window,$rootScope){
  $window.signinCallback = function (authResult) {
    if(authResult && authResult.access_token){
      $rootScope.$broadcast('event:google-plus-signin-success',authResult);
    }
    else{
      $rootScope.$broadcast('event:google-plus-signin-failure',authResult);
    }
  }; 
}]);


