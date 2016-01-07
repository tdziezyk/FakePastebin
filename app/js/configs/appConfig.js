angular.module('app', [ 'ui.router' ]).config([ '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('home', {
		url : "/login",
		templateUrl : "templates/login.html",
	}).state('login', {
		url : "/login",
		templateURL : "templates/login.html"
	}).state('login2', {
		url: "/login2",
		templateUrl: "templates/login2.html"
	});
	$urlRouterProvider.otherwise("/login");
} ]);
