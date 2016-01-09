(function(angular) {
	angular.module('app').controller(
			'EditPastebinController',
			[ 'langService', 'userService', 'Pastebin', '$stateParams', 'pastebinService', '$state',
					function(langService, userService, Pastebin, $stateParams, pastebinService, $state) {
						var that = this;
						that.pastebin = Pastebin;

						that.buttonText = "Edit pastebin";
						that.cancelText = "Cancel";
						that.languages = langService.getLanguages();
						that.selectedLanguage = langService.getLanguageById(that.pastebin.lang_id);

						that.buttonAction = function() {
							that.pastebin.lang_id = that.selectedLanguage.id;
							that.pastebin.language = that.selectedLanguage.name;
							pastebinService.updatePastebin(that.pastebin, that.pastebin.id).then(function(){
								$state.go('pastebinList');
							});
						};
						
						that.cancelAction = function(){
							$state.go('pastebinList');
						};
					} ]);
})(angular);