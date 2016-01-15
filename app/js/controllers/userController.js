(function(angular) {
	"use strict";

	angular.module('app').controller('UserController', [ 'userService', '$state', function(userService, $state) {
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
				
				if(!that.message){
					$state.go('pastebinList');
				}
				
				that.user.username = "";
				that.user.password = "";
			});
		};		
	} ]);
})(angular);