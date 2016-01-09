(function(angular) {
	"use strict";

	angular.module('app').controller('AddPastebinController',
			[ 'langService', 'userService', 'pastebinService', '$state', function(langService, userService, pastebinService, $state) {
				var that = this;
				that.pastebin = {
					username : userService.getUsername(),
					user_id : userService.getUserId(),
					code : ""
				};

				that.buttonText = "Add pastebin";
				that.cancelText = "Cancel";
				that.languages = langService.getLanguages();
				that.selectedLanguage = that.languages[0];

				that.buttonAction = function() {
					that.pastebin.date = new Date();
					that.pastebin.lang_id = that.selectedLanguage.id;
					that.pastebin.language = that.selectedLanguage.name;
					pastebinService.addPastebin(that.pastebin).then(function() {
						$state.go('pastebinList');
					});
				};

				that.cancelAction = function() {
					$state.go('pastebinList');
				};
			} ]);
})(angular);