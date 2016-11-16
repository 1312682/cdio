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

		.state('app.training-programs.faculties', {
			url : 'training-programs/faculties',
			views : {
				'content-view@' : {
					templateUrl : './components/faculties.html',
					controller: 'trainingCtr'
				}
			}
		})

		.state('app.training-programs.types', {
			url : 'training-programs/types',
			views : {
				'content-view@' : {
					templateUrl : './components/types.html',
					controller: 'trainingCtr'
				}
			}
		})

		.state('app.training-programs.subjects', {
			url : 'training-programs/subjects',
			views : {
				'content-view@' : {
					templateUrl : './components/subjects.html',
					controller: 'trainingCtr'
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

		.state('app.courses-map', {
			url : 'courses-map',
			views : {
				'content-view@' : {
					templateUrl : './components/courses-map.html',
				}
			}
		});
	});
}(jQuery));