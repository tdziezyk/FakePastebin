(function(angular) {
	angular.module('app').factory('userService', [ '$http', '$log', 'REST_END_POINT', function($http, $log, REST_END_POINT) {
		var user = null;
		
		var login = function (id){
			return $http({
				method : 'GET',
				url : REST_END_POINT + '/users/' + id
			}).then(function(response) {
				user = response.data;
			}, function(response) {
				$log.error("Request Failed: ", response);
			});			
		};
		
		var logout = function(){
			user = null;
		};

		var getUsername = function() {
			return user.username;
		};
		
		var getUserId = function(){
			return user.id;
		};
		
		var isAdmin = function(){
			return Boolean(user.is_admin);
		};

		return {
			getUsername : getUsername,
			getUserId : getUserId,
			isAdmin : isAdmin,
			login : login,
			logout : logout
		};
	} ]);
})(angular);