(function(angular) {
	angular.module('app').controller(
			'EditPastebinController',
			[ 'langService', 'userService', 'Pastebin', '$stateParams', 'pastebinService',
					function(langService, userService, Pastebin, $stateParams, pastebinService) {
						var that = this;
						that.pastebin = Pastebin;

						that.buttonText = "Edit pastebin";
						that.languages = langService.getLanguages();
						that.selectedLanguage = langService.getLanguageById(that.pastebin.lang_id);

						that.buttonAction = function() {
							that.pastebin.lang_id = that.selectedLanguage.id;
							that.pastebin.language = that.selectedLanguage.name;
							pastebinService.updatePastebin(that.pastebin, that.pastebin.id);
						};
					} ]);
})(angular);