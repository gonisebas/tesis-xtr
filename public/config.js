'use strict'

var deliveryApp = angular.module('deliveryApp',['ui.router', 'ui.bootstrap']);


deliveryApp.run(function ($rootScope,$state,$log) {
	$rootScope.$state = $state;
});

deliveryApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/notebooks');
    
    $stateProvider
        .state('offers', {
            url: '/notebooks',
            templateUrl: 'partials/offers.html',
            controller : 'OffersController',
        })
        .state('results', {
            url: '/notebooks',
            templateUrl: 'partials/search-results.html',
            controller : 'DeliveriesController',
            params:{searchString:{}}
        })
        .state('delivery', {
        	abstract: true,
        	url: '/delivery/:deliveryId',
        	controller: 'OrdersController',
			templateUrl: 'partials/order.html'
        })
        .state('delivery.order',{
        	url: '/menu',
        	views: {
	        	'ordersHeader@delivery': { 
	        		template: 'Realizá tu pedido!'
	        	},
	        	'ordersBody@delivery':{
	        		controller: 'DeliveryMenuController',
	        		templateUrl: 'partials/menu.html'
	        	}, 
	        	'ordersActions@delivery':{
	        		templateUrl: 'partials/menu-actions.html'
	        	}
	        }
        })
        .state('delivery.confirm',{
        	url: '/pedir',
        	views: {
	        	'ordersHeader@delivery': { 
	        		template: 'Completá tus datos!' 
	        	},
	        	'ordersBody@delivery': {
        			//controller: 'ConfirmController',
        			templateUrl: 'partials/customer-form.html'	        	
	        	}, 
	        	'ordersActions@delivery':{
	        		templateUrl: 'partials/confirm-actions.html'
	        	}
	        }
        });
        
});