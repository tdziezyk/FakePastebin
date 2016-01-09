(function(angular) {
	angular.module('app').controller('PastebinListController', [ 'pastebinService', function(pastebinService) {
		var that = this;

		that.pastebins = pastebinService.getPastebins();
	} ]);
})(angular);