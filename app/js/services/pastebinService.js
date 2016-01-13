(function(angular) {
	"use strict";

	angular.module('app').factory('pastebinService', [ '$http', '$log', 'REST_END_POINT', function($http, $log, REST_END_POINT) {
		var getPastebin = function(id) {
			return $http({
				method : 'GET',
				url : REST_END_POINT + '/pastebins/' + id
			}).then(function(response) {
				$log.log(response);
				return response.data;
			}, function(response) {
				$log.error("Request Failed: " + response);
			});
		};

		var addPastebin = function(data) {
			return $http({
				method : 'POST',
				url : REST_END_POINT + '/pastebins/',
				data : data
			}).then(function(response) {
				$log.log(response);
				return response.data;
			}, function(response) {
				$log.error("Request Failed: " + response);
			});
		};

		var updatePastebin = function(data, id) {
			return $http({
				method : 'PUT',
				url : REST_END_POINT + '/pastebins/' + id,
				data : data
			}).then(function(response) {
				$log.log(response);
				return response.data;
			}, function(response) {
				$log.error("Request Failed: " + response);
			});
		};

		var deletePastebin = function(id) {
			return $http({
				method : 'DELETE',
				url : REST_END_POINT + '/pastebins/' + id
			}).then(function(response) {
				$log.log(response);
				return response;
			}, function(response) {
				$log.error("Request Failed: " + response);
			});
		};

		var getAllPastebins = function() {
			return $http({
				method : 'GET',
				url : REST_END_POINT + '/pastebins/'
			}).then(function(response) {
				$log.log(response);
				return response.data;
			}, function(response) {
				$log.error("Request Failed: " + response);
			});
		};

		var getPastebinsForUser = function(id) {
			return $http({
				method : 'GET',
				url : REST_END_POINT + '/pastebins/',
				params: {user_id: id}
			}).then(function(response) {
				$log.log(response.data);
				return response.data;
			}, function(response) {
				$log.error("Request Failed: " + response);
			});
		};
		
		var getPastebins = function(id){
			if(id){
				return getPastebinsForUser(id);
			}
			else{
				return getAllPastebins();
			}
		};
	
		return {
			getPastebin : getPastebin,
			addPastebin : addPastebin,
			updatePastebin : updatePastebin,
			deletePastebin : deletePastebin,
			getPastebins : getPastebins
		};
	} ]);
})(angular);