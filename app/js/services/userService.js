(function(angular) {
	"use strict";

	angular.module('app').factory('userService', [ '$http', '$log', 'REST_END_POINT', '$localStorage', function($http, $log, REST_END_POINT, $localStorage) {
		var that = this;
		that.user = null;

		var login = function(id) {
			return $http({
				method : 'GET',
				url : REST_END_POINT + '/users/' + id
			}).then(function(response) {
				that.user = response.data;
			}, function(response) {
				$log.error("Request Failed: " + response);
			});
		};

		var loginUser = function(login, password) {
			return $http({
				method : 'GET',
				url : REST_END_POINT + '/users/',
				params : {
					username : login,
					password : password
				}
			}).then(function(response) {
				if(response.data && response.data[0]){
					that.user = response.data[0];
					$localStorage.id = getUserId();
					return that.user;
				}
				return {textMessage : "Wrong username or password"};
			}, function(response) {
				$log.error("Request Failed: " + response);
			});
		};
		
		var logout = function() {
			$localStorage.$reset();
			that.user = null;
		};

		var getUsername = function() {
			return that.user.username;
		};

		var getUserId = function() {
			if(!that.user){
				return -1;
			}
			return that.user.id;
		};

		var isAdmin = function() {
			return Boolean(that.user.is_admin);
		};

		var addUser = function(login, password) {
			return $http({
				method : 'POST',
				url : REST_END_POINT + '/users/',
				data : {
					username : login,
					password : password,
					is_admin : false
				}
			}).then(function(response) {
				return response;
			}, function(response) {
				$log.error("Request Failed: " + response);
			});
		};
		
		var registerUser = function(login, password) {
			var thatFunction = this;
			thatFunction.login = String(login);
			thatFunction.password = String(password);
			
			return $http({
				method : 'GET',
				url : REST_END_POINT + '/users/',
				params: {username : login}
			}).then(function(response) {
				if (response.data.length === 0) {
					return addUser(thatFunction.login, thatFunction.password).then(loginUser(thatFunction.login, thatFunction.password));
				}
				return {textMessage : "User with this login already exist"};
			}, function(response) {
				$log.error("Request Failed: " + response);
			});
		};

		return {
			getUsername : getUsername,
			getUserId : getUserId,
			isAdmin : isAdmin,
			login : login,
			logout : logout,
			registerUser : registerUser,
			loginUser : loginUser
		};
	} ]);
})(angular);