
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
 		$scope.reverse = true;

		notebooksFactory.getNotebooks().then(function(d) {
			var quantities = new Object();
			$scope.hardDisks = _.uniq(_.pluck(d, 'hardDisk'));
			propertiesCount(d,quantities, 'hardDisk');

			$scope.trademarks = _.uniq(_.pluck(d, 'trademark'));
			propertiesCount(d, quantities, 'trademark');

			$scope.screens = _.uniq(_.pluck(d, 'screen'));
			propertiesCount(d, quantities, 'screen');

			$scope.rams = _.uniq(_.pluck(d, 'ram'));
			propertiesCount(d, quantities, 'ram');

			$scope.microFamilies = _.uniq(_.pluck(d, 'microFamily'));
			propertiesCount(d, quantities, 'microFamily');

			$scope.states = _.uniq(_.pluck(d, 'state'));
			propertiesCount(d, quantities, 'state');

			$scope.propertiesCounter = quantities;
		});		
	}

	$scope.toggleReverse = function(){
		$scope.reverse =  !$scope.reverse;
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

	var modalInstance;

	$scope.goToCompare = function(){
		modalInstance = $uibModal.open({
			templateUrl: 'partials/compare.html',
			controller: 'ModalInstanceCtrl',
			windowClass: 'compare',
			backdropClass: 'compare',
			windowTopClass: 'compare', 
			scope:$scope
		});
	}
	
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

	$scope.$on('propertiesCounterChanged', function (event, value) {
	    $scope.propertiesCounter = value;
	});

	init();
	
});


deliveryApp.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance) {

  $scope.close = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

deliveryApp.controller('MenuController', function($scope, $state, notebooksFactory) {

	var propertyDecorator = {};
	propertyDecorator['screen'] = '{0}\"';
	propertyDecorator['ram'] = '{0}Gb';
	propertyDecorator['trademark'] = '{0}';
	propertyDecorator['microFamily'] = '{0}';
	propertyDecorator['hardDisk'] = '{0}Gb';
	propertyDecorator['state'] = '{0}';
	propertyDecorator['minPrice'] = 'Desde ${0}';
	propertyDecorator['maxPrice'] = 'Hasta ${0}';

	function init(){
		$scope.searchParam = {};
		$scope.appliedFilters = new Array();
	}

	$scope.reset = function(){
		$scope.searchParam = {};	
		$scope.appliedFilters = new Array();
		$scope.search();
	}
 
	$scope.search = function(filterName){
		var parameters = {}
		_.map($scope.searchParam, function(item,key){
			if (_.contains(['screen','ram','trademark', 'microFamily', 'hardDisk', 'state'], key)){
				parameters[key] = new Array();
				_.each(item, function(value){
					if (value.startsWith('false-')){
						value = value.split('-')[2];
						value = propertyDecorator[key].replace('{0}', value)
						removeFilterValue($scope, key, value);
					}else{
						parameters[key].push(value);
						var filterValue = propertyDecorator[key].replace('{0}', value);
						addFilterValue($scope, key, filterValue, false);
					}
				})
			}else{
				parameters[key] = item;
				if(item == null){
					var index = existsFilterKey($scope.appliedFilters, key);
					if (index != -1){
						$scope.appliedFilters.splice(index,1);
					}
				}else{
					var filterValue = propertyDecorator[key].replace('{0}', item);
					addFilterValue($scope, key, filterValue, true);
				}
			}
		});
		$state.go('results', {searchParam: parameters, additional: filterName},{reload: true});
	}
	
	init();

	function existsFilterKey(filters, key){
		return _.findIndex(filters, function(obj){
			return (obj.key == key)
		});
	}

	function existsFilterKeyValue(filters, key, value){
		return _.findIndex(filters, function(obj){
			return (obj.key == key) && (obj.value == value)
		});
	}

	function removeFilterValue(scope, key, value){
		var index = existsFilterKeyValue(scope.appliedFilters, key, value);
		if (index != -1){
			scope.appliedFilters.splice(index,1);
		}
	}

	function addFilterValue(scope, key, value, override){
		if ("false" == value) {
			return;
		}
		if (override){
			var index = existsFilterKey(scope.appliedFilters, key);
			if (index != -1){
				$scope.appliedFilters[index].value = value;
			}else{
				$scope.appliedFilters.push({key: key, value: value});
			}
		}else{
			var index = _.findIndex(scope.appliedFilters, function(obj){
				return (obj.value == value)
			});
			if (index == -1){
				$scope.appliedFilters.push({key: key, value: value});
			}
		}
		
	}
});

deliveryApp.controller('OffersController', function($scope, notebooksFactory) {

	function init(){
		notebooksFactory.getNotebooks().then(function(d) {
		    $scope.notebooks  = d;//d.slice(0, 5);
		  });
	};

	init();
});


deliveryApp.controller('ResultsController', function($scope, $stateParams, $rootScope, notebooksFactory, valuesRange, weight) {

	$scope.sortByField = 'price-low-high';

	$scope.orderByField = function (result) {
		if ($scope.sortByField == 'price-low-high') {
			return result.price;
		}
		if ($scope.sortByField == 'price-high-low') {
			return -result.price;
		}
		else return result[$scope.sortByField];
	};

  function rank(list){
    _.each(list, function(item){
      item.rank = ranking(item);
      console.log(item.name + " " + item.rank)
    })
  }

  function ranking(item){
    var ranking = 0;
    ranking += rankByPropery(item, 'price', true);
    ranking += rankByPropery(item, 'ram', true);
    ranking += rankByPropery(item, 'hardDisk', true);
    ranking += rankByPropery(item, 'screen',true);
    ranking += rankByPropery(item, 'state',false);
    return 5 - ranking;
  }

  function rankByPropery(item, property, isNumber){
    var value = 0;
    if (isNumber){
      _.each(valuesRange[property], function(a){
        if (item[property] > a.min && item[property] <= a.max){
          value = a.value;
        }
      });
    }else{
      _.each(valuesRange[property], function(a){
        if (item[property] == a.label){
          value = a.value;
        }
      });
    }
    return value * weight[property];
  }

  function countPeripheral(list){
    var p = ["bluetooth", "webcam"]
    _.each(list, function(item){
      item.peripheral = 0;
      _.each(p, function(d){
        if (item[d]){
          item.peripheral++;
        }
      })
    });
  }

	function init(){
		var params = $stateParams.searchParam;
		var fieldName = $stateParams.additional;
		notebooksFactory.getNotebooks(params).then(function(d) {
			var quantities = new Object();
			$scope.hardDisks = _.uniq(_.pluck(d, 'hardDisk'));
			propertiesCount(d,quantities, 'hardDisk');

			$scope.trademarks = _.uniq(_.pluck(d, 'trademark'));
			propertiesCount(d, quantities, 'trademark');

			$scope.screens = _.uniq(_.pluck(d, 'screen'));
			propertiesCount(d, quantities, 'screen');

			$scope.rams = _.uniq(_.pluck(d, 'ram'));
			propertiesCount(d, quantities, 'ram');

			$scope.microFamilies = _.uniq(_.pluck(d, 'microFamily'));
			propertiesCount(d, quantities, 'microFamily');

			$scope.states = _.uniq(_.pluck(d, 'state'));
			propertiesCount(d, quantities, 'state');

			_.each(quantities, function(value, key){
				if (fieldName != key){
					$scope.propertiesCounter[key] = value;
				}
			});

			$rootScope.$broadcast('propertiesCounterChanged', $scope.propertiesCounter);

		    $scope.notebooks  = d;
		    $scope.operating_systems = _.uniq(_.pluck(d, 'operating_system'));
		    $scope.bateries = _.uniq(_.pluck(d, 'batery'));
	        countPeripheral(d);
        	rank(d);
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

	function propertiesCount(d, quantities, property){
		quantities[property] = new Object();
		_.each(d, function(notebook){
			if (!quantities[property][notebook[property]]){
				quantities[property][notebook[property]]=0;
			}
			quantities[property][notebook[property]]++;

		});		
	}