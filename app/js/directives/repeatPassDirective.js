(function(angular) {
	"use strict";

	angular.module('app').directive('repeatPass', [ function() {
		return {
			require : "ngModel",
			restrict : "A",
			scope: {
	            value: "=repeatPass"
	        },
	        link: function(scope, element, attributes, ngModel) {
	             
	            ngModel.$validators.repeatPass = function(modelValue) {
	                return modelValue === scope.value;
	            };
	 
	            scope.$watch("value", function() {
	                ngModel.$validate();
	            });
	        }
		};
	} ]);
})(angular);