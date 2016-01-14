(function(angular) {
	"use strict";

	angular.module('app').controller('UserController', [ 'userService', function(userService) {
		var that = this;
		this.user = {
				username : "",
				password : ""
		};
		
		that.signup = function(){
			userService.registerUser(that.user.username, that.user.password).then(function(response){
				that.message = response.textMessage;
				
				that.user.username = "";
				that.user.password = "";
				that.repeatedPassword = "";
			});
		};
		
		that.login = function(){
			userService.loginUser(that.user.username, that.user.password).then(function(response){
				that.message = response.textMessage;
				
				that.user.username = "";
				that.user.password = "";
			});
		};
		
		that.logout = function(){
			userService.logout();
		};
	} ]);
})(angular);