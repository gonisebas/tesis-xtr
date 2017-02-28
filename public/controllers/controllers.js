deliveryApp.controller('MenuController', function($scope, $state) {

	$scope.search = function(){
		var parameters = {}
		_.map($scope.searchParam, function(item,key){
			if (_.contains(['screen','ram','trademark', 'microFamily', 'hardDisk', 'state'], key)){
				parameters[key] = new Array();
				_.each(item, function(value){
					parameters[key].push(value);
				})
			}
		});
		$state.go('results', {searchParam: parameters},{reload: true});
	}
	
	$scope.searchParam = {};
});

deliveryApp.controller('OffersController', function($scope, notebooksFactory) {

	function init(){
		notebooksFactory.getNotebooks().then(function(d) {
		    $scope.notebooks  = d.slice(0, 5);
		  });
	};

	init();
});


deliveryApp.controller('DeliveriesController', function($scope, $stateParams, notebooksFactory) {

	function init(){
		var params = $stateParams.searchParam;
		notebooksFactory.getNotebooks(params).then(function(d) {
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