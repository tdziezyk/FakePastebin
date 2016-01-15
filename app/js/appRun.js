(function(angular) {
	"use strict";

	angular.module('app').run([ '$location', '$state', 'userService', '$rootScope', function($location, $state, userService, $rootScope) {
		  var routesWithoutAuth = ['/login', '/pastebin_list'];
		  var routesForAdmin = ['/admin_panel'];

		  var routeClean = function (route, routes) {
		    return _.find(routes,
		      function (noAuthRoute) {
		        return route.slice(0, noAuthRoute.length) === noAuthRoute;
		      });
		  };

		  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
		    if (!routeClean(toState.url, routesWithoutAuth) && userService.getUserId() < 0) {
				event.preventDefault();
		    }
		    else if(routeClean(toState.url, routesForAdmin) && !userService.isAdmin()){
		    	event.preventDefault();
		    }
		  });
	} ]);
})(angular);
