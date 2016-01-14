(function(angular) {
	"use strict";

	angular.module('app').controller('AppController', [ 'userService', '$scope', function(userService, $scope) {
		var that = this;
		that.userid = function(){
			var id = userService.getUserId();
			return id;
		};
	} ]);
})(angular);