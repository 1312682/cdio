"use strict";

(function($){
	let app = angular.module('app');
	
	app.config(function( $stateProvider, $urlRouterProvider ) {
		$urlRouterProvider.otherwise('/');
		$stateProvider
		.state('app', {
			url : '/',
			views : {
				'content-view' : {
					templateUrl : './components/dashboard.html',
				}
			}
		})

		.state('app.training-programs', {
			url : 'training-programs',
			views : {
				'content-view@' : {
					templateUrl : './components/training-programs.html',
				}
			}
		})

		.state('app.learning-outcomes', {
			url : 'learning-outcomes',
			views : {
				'content-view@' : {
					templateUrl : './components/learning-outcomes.html',
				}
			}
		});
	});
}(jQuery));