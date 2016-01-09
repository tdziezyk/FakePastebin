(function(angular) {
	angular.module('app').factory('pastebinService', [ '$http', '$log', 'REST_END_POINT', function($http, $log, REST_END_POINT) {
		var pastebins = {data: null};
		
		var getPastebins = function(){
			$http({
				method : 'GET',
				url : REST_END_POINT + '/pastebins/'
			}).then(function(response) {
				pastebins.data = response.data;
				$log.log(response);
			}, function(response) {
				$log.error("Request Failed: ", response);
			});
			return pastebins;
		};

		return {
			getPastebins : getPastebins
		};
	} ]);
})(angular);