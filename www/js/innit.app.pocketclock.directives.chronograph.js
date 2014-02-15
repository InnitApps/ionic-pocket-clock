var InnitChronograph = angular.module('innit.ui.chronograph', ['ngAnimate'])
	
// http://codepen.io/ninjascribble/pen/rHwkK

InnitChronograph.directive('innitChronograph', ['$animate', function($animate) {

	return {
            restrict: 'E',
            templateUrl: 'partials/innit.directive.chronograph.html',
            replace: true,
            link: function(scope, element, attrs){

            	var defaults = {}
			    , one_second = 1000
			    , one_minute = one_second * 60
			    , one_hour = one_minute * 60
			    , one_day = one_hour * 24
			    , face = document.getElementById("chronoValue")
			    , startDate = new Date();

			    var offset = startDate.setTime(startDate.getTime() - 10000)


			     // element.bind('slide1', function() {
      		// 		if(element.hasClass('clicked')) {
				    //     $animate.removeClass(element, 'clicked');
				    //   } else {
				    //     $animate.addClass(element, 'clicked');
				    //   }
				    // });
			    
			    
			     // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
				 var requestAnimationFrame = (function() {
				    return window.requestAnimationFrame       || 
				           window.webkitRequestAnimationFrame || 
				           window.mozRequestAnimationFrame    || 
				           window.oRequestAnimationFrame      || 
				           window.msRequestAnimationFrame     || 
				           function( callback ){
				             window.setTimeout(callback, 1000 / 60);
				           };
				  }());

				 tick();

			    function tick() {

				  var now = new Date()

				    , elapsed = now - offset
				    , parts = [];
				  parts[0] = '' + Math.floor( elapsed / one_hour );
				  parts[1] = '' + Math.floor( (elapsed % one_hour) / one_minute );
				  parts[2] = '' + Math.floor( ( (elapsed % one_hour) % one_minute ) / one_second );

				  parts[0] = (parts[0].length == 1) ? '0' + parts[0] : parts[0];
				  parts[1] = (parts[1].length == 1) ? '0' + parts[1] : parts[1];
				  parts[2] = (parts[2].length == 1) ? '0' + parts[2] : parts[2];

				  face.innerText = parts.join(':');
				  // console.log(face.innerText)

				  requestAnimationFrame(tick);
				  	
				}


              
            },
            controller: function($scope,$element){
            

       //      	$scope.timers = [
			    // 	{
			    // 		name: "Hours",
			    // 		class: "hour"
			    // 	},
			    // 	{
			    // 		name: "Minutes",
			    // 		class: "minute"
			    // 	},
			    // 	{
			    // 		name: "Seconds",
			    // 		class: "second"
			    // 	}

			    // ];

			    // $scope.hands = [
			    // 	{
			    // 		name: "Hour Hand",
			    // 		class: "hand",
			    // 		animation: "spin1"
			    // 	},
			    // 	{
			    // 		name: "Minutes Hand",
			    // 		class: "hand",
			    // 		animation: "spin1"
			    // 	},
			    // 	{
			    // 		name: "Seconds Hand",
			    // 		class: "hand",
			    // 		animation: "spin2"
			    // 	}

			    // ]
           }
    }

}]);



// http://codepen.io/ninjascribble/pen/rHwkK

 
    
  
   
  