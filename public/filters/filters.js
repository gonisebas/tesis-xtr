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