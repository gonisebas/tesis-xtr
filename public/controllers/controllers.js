deliveryApp.controller('DeliveriesController', function($scope, deliveriesFactory, notebooksFactory) {

	function init(){
		$scope.deliveries = deliveriesFactory.getDeliveries();
		notebooksFactory.getNotebooks().then(function(d) {
		    $scope.notebooks  = d;
		  });
	};

	init();
});

deliveryApp.controller('OrdersController', function($scope, $stateParams, $filter, $location, $uibModal, ordersFactory) {
	
	$scope.addProduct = function(product){
		$scope.orderingItems.push({product: product, quantity: 1});
	}

	$scope.removeItem = function(orderingItem){
		$scope.orderingItems.splice($scope.orderingItems.indexOf(orderingItem), 1);
	}

	function init(){
		var deliveryId = $stateParams.deliveryId
		$scope.orderingItems = [];
		$scope.customer = {};
	}

	$scope.sendRequest = function(){

		var modalInstance = $uibModal.open({
			templateUrl: 'partials/modal.html',
			controller: 'ModalInstanceCtrl',
			resolve: {
				customer: function(){
					return $scope.customer;
				},
				orders: function(){
					return $scope.orderingItems;
				}
			}
		});
	}

	init();
});

deliveryApp.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, customer, orders) {

  $scope.customer = customer;
  $scope.orders = orders;  

  $scope.close = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

deliveryApp.controller('DeliveryMenuController', function($scope, $stateParams, ordersFactory) {

	$scope.getSectionProducts = function(sectionId){
		$scope.products = ordersFactory.getSectionProducts(sectionId);
	};

	function init(){
		$scope.sections = ordersFactory.getDeliverySections($stateParams.deliveryId);
	};

	init();
});