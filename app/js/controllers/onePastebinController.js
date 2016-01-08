angular.module('app').controller('OnePastebinController', [ 'buttonText', 'langService', 'userService', function(buttonText, langService, userService) {
	var that = this;

	that.buttonText = buttonText;
	that.username = userService.getUsername();
	that.languages = langService.getLanguages();
} ]);