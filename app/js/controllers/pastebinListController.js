(function(angular) {
	angular.module('app').controller('PastebinListController', [ 'pastebinService', 'userService', function(pastebinService, userService) {
		var that = this;

		pastebinService.getPastebins().then(function(results){
			that.pastebins = results;
			that.displayPastebins = [].concat(that.pastebins);
		});

		that.isErasable = function(pastebin) {
			return pastebin.user_id === userService.getUserId();
		};

		that.removePastebin = function(id, position) {
			var result = pastebinService.deletePastebin(id);
			result.then(function() {
				that.displayPastebins.splice(position, 1);
			});
		};
	} ]);
})(angular);