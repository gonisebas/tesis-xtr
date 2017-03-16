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

deliveryApp.filter('hasMultipleAttr', function() {
  return function(items, values, property) {
    return multipleValueFilter(items, values, property);
  }
});

function multipleValueFilter(items, values, property) {
    var list = new Array();
    angular.forEach(values, function(v){
        if (v && (v != '')){
            list.push(v);
        }
    })
    var filtered = [];
    angular.forEach(items, function(el) {
        if (list && (list.length > 0)){
            if (_.contains(list, el[property])){
                filtered.push(el);
            }
        }else{
            filtered.push(el);
        }
        
    });
    return filtered;
  }

deliveryApp.filter('hasSingleAttr', function() {
  return function(items, values, property) {
    return singleValueFilter(items, values, property)
  }
});


function singleValueFilter(items, values, property) {
    var filtered = [];
    angular.forEach(items, function(el) {
        if (values == "true"){
            if (el[property]){
                filtered.push(el);
            }
        }else{
            filtered.push(el);
        }
        
    });
    return filtered;
}