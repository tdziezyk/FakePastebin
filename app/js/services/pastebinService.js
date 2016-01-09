(function(angular) {
	angular.module('app').factory('pastebinService', [ '$http', '$log', 'REST_END_POINT', function($http, $log, REST_END_POINT) {
		var pastebin = null, pastebins = {data: null};

		var getPastebin = function(id) {
			return $http({
				method : 'GET',
				url : REST_END_POINT + '/pastebins/' + id
			}).then(function(response) {
				$log.log(response);
				return response.data;
			}, function(response) {
				$log.error("Request Failed: ", response);
			});
		};
		
		var addPastebin = function(data){
			return $http({
				method : 'POST',
				url : REST_END_POINT + '/pastebins/',
				data: data
			}).then(function(response) {
				$log.log(response);
				return response.data;
			}, function(response) {
				$log.error("Request Failed: ", response);
			});
		};

		var updatePastebin = function(data, id){
			return $http({
				method : 'PUT',
				url : REST_END_POINT + '/pastebins/' + id,
				data: data
			}).then(function(response) {
				$log.log(response);
				return response.data;
			}, function(response) {
				$log.error("Request Failed: ", response);
			});
		};
		
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
			getPastebin : getPastebin,
			addPastebin : addPastebin,
			updatePastebin : updatePastebin,
			getPastebins : getPastebins
		};
	} ]);
})(angular);