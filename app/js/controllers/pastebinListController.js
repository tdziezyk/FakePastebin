(function(angular) {
	"use strict";

	angular.module('app').controller('PastebinListController',
			[ 'pastebinService', 'userService', '$state', '$scope', '$timeout', function(pastebinService, userService, $state, $scope, $timeout) {
				var that = this;

				pastebinService.getPastebins().then(function(results) {
					that.pastebins = results;
					that.displayPastebins = [].concat(that.pastebins);
				});

				that.isErasable = function(pastebin) {
					return pastebin.user_id === userService.getUserId();
				};

				that.isEditable = function(pastebin) {
					return pastebin.user_id === userService.getUserId();
				};

				that.removePastebin = function(id, position) {
					var result = pastebinService.deletePastebin(id);
					result.then(function() {
						that.displayPastebins.splice(position, 1);
					});
				};

				that.edit = function(pastebin) {
					$state.go("editPastebin", {
						id : pastebin.id
					});
				};
				
				var dateFilterWatch = $scope.$watch('ctrl.dateFilter', function(newValue){
					var filterDate = null;
					var parsedDateString = null;
					
					if(newValue && newValue.length === 8){
						filterDate = new Date(newValue.substring(4, 9), (newValue.substring(2, 4)-1), newValue.substring(0, 2));
						parsedDateString = ("0" + filterDate.getDate()).slice(-2) + ("0" + (filterDate.getMonth()+1)).slice(-2) + filterDate.getFullYear();
						if(parsedDateString !== newValue){
							$timeout(function(){
								that.dateFilter = parsedDateString; 
							});
						}
					}
				});
				
			} ]);
})(angular);