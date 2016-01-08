angular.module('app').controller('OnePastebinController', ['buttonText', 'langService', function(buttonText, langService) {
	var that = this;
	
	that.buttonText = buttonText;
	
	that.languages = langService.getLanguages();
}]);