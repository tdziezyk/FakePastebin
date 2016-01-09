(function(angular) {
	angular.module('app').controller('AddPastebinController',
			[ 'langService', 'userService', 'pastebinService', function(langService, userService, pastebinService) {
				var that = this;
				that.pastebin = {
					username : userService.getUsername(),
					user_id : userService.getUserId(),
					code : ""
				};

				that.buttonText = "Add pastebin";
				that.languages = langService.getLanguages();
				that.selectedLanguage = that.languages[0];

				that.buttonAction = function() {
					that.pastebin.date = new Date();
					that.pastebin.lang_id = that.selectedLanguage.id;
					that.pastebin.language = that.selectedLanguage.name;
					pastebinService.addPastebin(that.pastebin);
				};
			} ]);
})(angular);