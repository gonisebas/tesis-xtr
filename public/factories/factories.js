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

deliveryApp.factory('notebooksFactory',function($http){
	return{
		getNotebooks: function(params){
			return $http.get('/api/notebooks', {params: params}).then(function (response) {
				return response.data;
      		});
		},
		getNotebook: function(id){
				return $http.get('/api/notebooks/'+id).then(function (response) {
					return response.data;
	      		});
			}
		}
});