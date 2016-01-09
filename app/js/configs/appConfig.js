angular.module('app', [ 'ui.router' ]).config([ '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('authentication', {
		url : "/",
		templateUrl : "templates/login_or_signup.html"
	}).state('addPastebin', {
		url : "/add_pastebin",
		templateUrl : "templates/one_pastebin.html",
		controller : "AddPastebinController",
		controllerAs : "ctrl",
		resolve : {
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
		url : "/edit_pastebin/{id:int}",
		templateUrl : "templates/one_pastebin.html",
		controller : 'EditPastebinController',
		controllerAs : "ctrl",
		resolve : {
			'LanguagesData' : function(langService) {
				return langService.promise;
			},
			'UserData' : function(userService) {
				return userService.login(2);
			},
			'Pastebin' : function($stateParams, pastebinService){
				return pastebinService.getPastebin($stateParams.id);
			}
		}
	});
	$urlRouterProvider.otherwise("/");
} ]);
