'use strict'

var deliveryApp = angular.module('deliveryApp',['ui.router', 'ui.bootstrap']);


deliveryApp.run(function ($rootScope,$state,$log) {
	$rootScope.$state = $state;
});

deliveryApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    
    $urlRouterProvider.otherwise('/xtr/notebooks');
    
    $stateProvider
        .state('offers', {
            url: '/xtr/notebooks',
            templateUrl: 'partials/offers.html',
            controller : 'OffersController',
        })
        .state('results', {
            url: '/xtr/busqueda',
            templateUrl: 'partials/search-results.html',
            controller : 'DeliveriesController',
            params:{searchParam:{}}
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
        $locationProvider.html5Mode(true);        
});