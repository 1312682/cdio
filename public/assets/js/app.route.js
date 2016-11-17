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
					controller: 'trainingCtr'
				}
			}
		})

		.state('app.training-programs.programs', {
			url : '/programs',
			views : {
				'content-view@' : {
					templateUrl : './components/training-programs.html',
					controller: 'trainingCtr'
				}
			}
		})

		.state('app.training-programs.types', {
			url : '/types',
			views : {
				'content-view@' : {
					templateUrl : './components/types.html',
					controller: 'trainingCtr'
				}
			}
		})

		.state('app.training-programs.subjects', {
			url : '/subjects',
			views : {
				'content-view@' : {
					templateUrl : './components/subjects.html',
					controller: 'subjectsCtr'
				}
			}
		})

		.state('app.learning-outcomes', {
			url : 'learning-outcomes',
			views : {
				'content-view@' : {
					templateUrl : './components/learning-outcomes.html',
					controller: 'learningCtr'
				}
			}
		})
	});
}(jQuery));