
deliveryApp.controller('ViewController', function($scope, notebooksFactory, notebookId) {
	notebooksFactory.getNotebook(notebookId).then(function(d) {
    	$scope.notebook  = d;
	});
});


deliveryApp.controller('HomeController', function($scope, $state, $uibModal,notebooksFactory) {

	function init(){
 		$scope.filterTouchscreen = 'false';
 		$scope.filterBluetooth = 'false';
 		$scope.filterWebcam = 'false';
 		$scope.filterHdmi = 'false';

		notebooksFactory.getNotebooks().then(function(d) {
			$scope.hardDisks = _.uniq(_.pluck(d, 'hardDisk'));
			$scope.trademarks = _.uniq(_.pluck(d, 'trademark'));
			$scope.screens = _.uniq(_.pluck(d, 'screen'));
			$scope.rams = _.uniq(_.pluck(d, 'ram'));
			$scope.microFamilies = _.uniq(_.pluck(d, 'microFamily'));
			$scope.states = _.uniq(_.pluck(d, 'state'));
		});		
	}

	$scope.addToCompare = function(newItem){
		if (! _.find($scope.comparationItems, function(item){return item._id == newItem._id})){
			$scope.comparationItems.push(newItem);
		}
	}

	$scope.removeToCompare = function(uuid){
		$scope.comparationItems = _.filter($scope.comparationItems, function(item){
			return item._id != uuid
		});
	}


	$scope.goToCompare = function(){
		var modalInstance = $uibModal.open({
			templateUrl: 'partials/compare.html',
			controller: 'ModalInstanceCtrl',
			scope:$scope
		});
	}

	var modalInstance;
	
	$scope.view = function(notebookId){
		//$state.go('view',{notebookId: notebookId});
		modalInstance = $uibModal.open({
			templateUrl: 'partials/view.html',
			controller: 'ViewController',
			scope:$scope,
			resolve: {
				notebookId: function(){
					return notebookId;
				}
			}
		});
	}

	$scope.cancel = function () {
	    modalInstance.dismiss('cancel');
	};

	$scope.filterOperatingSystem = new Array();
	$scope.filterBatery = new Array();

	$scope.comparationItems = new Array();

	init();
	
});


deliveryApp.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance) {

  $scope.close = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

deliveryApp.controller('MenuController', function($scope, $state, notebooksFactory) {

	function init(){
		$scope.searchParam = {};
	}

	$scope.reset = function(){
		$scope.searchParam = {};	
	}
 
	$scope.search = function(){
		var parameters = {}
		_.map($scope.searchParam, function(item,key){
			if (_.contains(['screen','ram','trademark', 'microFamily', 'hardDisk', 'state'], key)){
				parameters[key] = new Array();
				_.each(item, function(value){
					parameters[key].push(value);
				})
			}else{
				parameters[key] = item;
			}
		});
		$state.go('results', {searchParam: parameters},{reload: true});
	}
	
	init();
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
		$scope.sortByField = 'price';
		notebooksFactory.getNotebooks(params).then(function(d) {
		    $scope.notebooks  = d;
		    $scope.operating_systems = _.uniq(_.pluck(d, 'operating_system'));
			$scope.bateries = _.uniq(_.pluck(d, 'batery'));
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

deliveryApp.controller('DeliveryMenuController', function($scope, $stateParams, ordersFactory) {

	$scope.getSectionProducts = function(sectionId){
		$scope.products = ordersFactory.getSectionProducts(sectionId);
	};

	function init(){
		$scope.sections = ordersFactory.getDeliverySections($stateParams.deliveryId);
	};

	init();
});