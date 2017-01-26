deliveryApp.factory('ordersFactory', function(){
	var orderingItems;
	return {
		getDeliverySections: function(deliveryId){
			return sections[deliveryId];
		},
		getSectionProducts: function(sectionId){
			return products[sectionId];
		},
		setOrderingItems: function(items){
			orderingItems = items;
		},
		getOrderingItems: function(){
			return orderingItems;
		}
	}
});

deliveryApp.factory('deliveriesFactory', function(){
	return {
		getDeliveries: function(sectionId){
			return deliveries;
		}
	}
});


deliveryApp.factory('notebooksFactory',function($http){
	return{
		getNotebooks: function(){
			return $http.get('/api/notebooks').then(function (response) {
				return response.data;
      		});
		}
	}
});