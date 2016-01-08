(function(angular) {
	angular.module('app').factory('langService', [ '$http', '$log', 'REST_END_POINT', function($http, $log, REST_END_POINT) {
		var langs = null;

		var promise = $http({
			method : 'GET',
			url : REST_END_POINT + '/langs'
		}).then(function(response) {
			langs = response.data;
		}, function(response) {
			$log.error("Request Failed: ", response);
		});

		var getLanguages = function() {
			return langs;
		};

		return {
			promise : promise,
			getLanguages : getLanguages
		};
	} ]);
})(angular);