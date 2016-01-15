(function(angular) {
	"use strict";

	angular.module('app').controller('AppController', [ 'userService', '$scope', '$state', '$localStorage', function(userService, $scope, $state, $localStorage) {
		var that = this;
		that.userid = function(){
			var id = userService.getUserId();
			return id;
		};
		
		that.isUserLogged = function(){
			return userService.getUserId() >= 0;
		};
		
		that.isAdminUser = function(){
			return userService.isAdmin();
		};
		
		that.logout = function(){
			userService.logout();
			$state.go("authentication");
		};
		
		if($localStorage.id !== undefined){
			userService.login($localStorage.id);
		}
	} ]);
})(angular);