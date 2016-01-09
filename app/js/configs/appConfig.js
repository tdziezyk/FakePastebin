angular.module('app', [ 'ui.router' ]).config([ '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('authentication', {
		url : "/",
		templateUrl : "templates/login_or_signup.html"
	}).state('addPastebin', {
		url : "/add_pastebin",
		templateUrl : "templates/one_pastebin.html",
		controller : "OnePastebinController",
		controllerAs : "ctrl",
		resolve : {
			buttonText : function() {
				return "add pastebin";
			},
			'LanguagesData' : function(langService) {
				return langService.promise;
			},
			'UserData' : function(userService) {
				return userService.login(2);
			}
		}
	}).state('pastebinList', {
		url : "/pastebin_list",
		templateUrl : "templates/pastebin_list.html",
		controller : "PastebinListController",
		controllerAs : "ctrl"
	}).state('usersPastebin', {
		url : "/users_pastebin",
		templateUrl : "templates/pastebin_list.html"
	}).state('editPastebin', {
		url : "/edit_pastebin",
		templateUrl : "templates/one_pastebin.html",
		controller : 'OnePastebinController',
		controllerAs : "ctrl",
		resolve : {
			buttonText : function() {
				return "edit pastebin";
			},
			'LanguagesData' : function(langService) {
				return langService.promise;
			},
			'UserData' : function(userService) {
				return userService.login(2);
			}
		}
	});
	$urlRouterProvider.otherwise("/");
} ]);
