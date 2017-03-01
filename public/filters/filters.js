deliveryApp.filter('totalSumPriceQty', function () {
    return function (data, key1, key2) {        
        if (angular.isUndefined(data) && angular.isUndefined(key1)  && angular.isUndefined(key2)) 
            return 0;
        
        var sum = 0;
        var quantity;
        key2 = key2.split('.');
        angular.forEach(data,function(v,k){
            quantity = parseInt(v[key1]) || 0;
            sum = sum + (quantity * parseInt(v[key2[0]][key2[1]]));
        });
        return sum;
    }
});

deliveryApp.filter('hasOperatingSystem', function() {
  return function(items, values) {
    var filtered = [];
    angular.forEach(items, function(el) {
        if (values && (values.length > 0)){
            if (_.contains(values, el.operating_system)){
                filtered.push(el);
            }
        }else{
            filtered.push(el);
        }
        
    });
    return filtered;
  }
});


deliveryApp.filter('hasBatery', function() {
  return function(items, values) {
    var filtered = [];
    angular.forEach(items, function(el) {
        if (values && (values.length > 0)){
            if (_.contains(values, el.batery)){
                filtered.push(el);
            }
        }else{
            filtered.push(el);
        }
        
    });
    return filtered;
  }
});