(function(angular) {
	"use strict";

	angular.module('app').controller(
			'PastebinListController',
			[
					'pastebinService',
					'userService',
					'$state',
					'$scope',
					'$timeout',
					'$stateParams',
					function(pastebinService, userService, $state, $scope, $timeout, $stateParams) {
						var that = this;
						var userId = $stateParams.id;
						var dateToStringFormat = function(date) {
							return ("0" + date.getDate()).slice(-2) + ("0" + (date.getMonth() + 1)).slice(-2) + date.getFullYear();
						};

						var milisecondsToStringFormat = function(date) {
							var filterDate = null;

							filterDate = new Date(date.substring(4, 9), (date.substring(2, 4) - 1), date.substring(0, 2));
							return dateToStringFormat(filterDate);
						};

						pastebinService.getPastebins(userId).then(function(results) {
							that.pastebins = results;
							that.displayPastebins = [];
							that.pastebins.forEach(function(element, index) {
								that.displayPastebins.push({
									dateInString : dateToStringFormat(new Date(element.date)),
									pastebin : element,
									list_id : index
								});
							});
						});

						that.isErasable = function(pastebin) {
							return pastebin.user_id === userService.getUserId() && userId;
						};

						that.isEditable = function(pastebin) {
							return pastebin.user_id === userService.getUserId() && userId;
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

						var dateFilterWatch = $scope.$watch('ctrl.dateFilter', function(newValue) {
							var filterDate = null;
							var parsedDateString = null;

							if (newValue && newValue.length === 8) {
								filterDate = new Date(newValue.substring(4, 9), (newValue.substring(2, 4) - 1), newValue.substring(0, 2));
								parsedDateString = ("0" + filterDate.getDate()).slice(-2) + ("0" + (filterDate.getMonth() + 1)).slice(-2) + filterDate.getFullYear();
								if (parsedDateString !== newValue) {
									$timeout(function() {
										that.dateFilter = parsedDateString;
									});
								}
							}
						});

						that.fulltextFilter = function(item) {
							var textFilter, username, language, code;
							if (!that.textFilter) {
								return true;
							}
							
							textFilter = that.textFilter.toLowerCase;
							username = String(item.pastebin.username).toLowerCase();
							language = String(item.pastebin.language).toLowerCase();
							code = String(item.pastebin.code).toLowerCase();
							if (username.indexOf(that.textFilter) !== -1 || language.indexOf(that.textFilter) !== -1 || code.indexOf(that.textFilter) !== -1) {
								return true;
							}
							return false;
						};

					} ]);
})(angular);