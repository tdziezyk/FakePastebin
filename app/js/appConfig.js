(function(angular) {
	"use strict";

	angular.module('app', [ 'ui.router', 'ui.mask' ]).config([ '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider.state('authentication', {
			url : "/",
			templateUrl : "templates/login_or_signup.html"
		}).state('addPastebin', {
			url : "/add_pastebin",
			templateUrl : "templates/one_pastebin.html",
			controller : "AddPastebinController",
			controllerAs : "ctrl",
			resolve : {
				'LanguagesData' : ['langService', function(langService) {
					return langService.promise;
				}]
			}
		}).state('pastebinList', {
			url : "/pastebin_list",
			templateUrl : "templates/pastebin_list.html",
			controller : "PastebinListController",
			controllerAs : "ctrl",
		}).state('usersPastebin', {
			url : "/users_pastebin/{id:int}",
			templateUrl : "templates/pastebin_list.html",
			controller : "PastebinListController",
			controllerAs : "ctrl",
		}).state('editPastebin', {
			url : "/edit_pastebin/{id:int}",
			templateUrl : "templates/one_pastebin.html",
			controller : 'EditPastebinController',
			controllerAs : "ctrl",
			resolve : {
				'LanguagesData' : ['langService', function(langService) {
					return langService.promise;
				}],
				'Pastebin' : ['$stateParams', 'pastebinService', function($stateParams, pastebinService) {
					return pastebinService.getPastebin($stateParams.id);
				}]
			}
		});
		$urlRouterProvider.otherwise("/");
	} ]);
})(angular);
