deliveryApp
    .constant('fuzzy', {
        MEMORY_POCA: 'event_order_created',
        MEMORY_BASTANTE: 'event_inventory_depleted',

        PRICE_VERY_ECONOMIC: 'very_economic',
        PRICE_ECONOMIC: 'economic',
        PRICE_REASONABLE: 'reasonable',
        PRICE_EXPENSIVE: 'expensive',
        PRICE_VERY_EXPENSIVE: 'very_expensive'

    }).
    constant('weight', {state: 0.5, price: 0.1, ram: 0.1, processor: 0.1, screen: 0.07, hardDisk: 0.07, batery: 0.03, peripheral: 0.03}).
    constant('valuesRange',{
    	price: [
    		{label: 'very_economic', min:0, max:5000, value:5},	
    		{label: 'economic', min: 5000, max: 12000, value:4},
    		{label: 'reasonable', min: 12000, max: 17000, value: 3},
    		{label: 'expensive', min: 17000, max: 21000, value:2},
			{label: 'very_expensive', min: 21000, max: 99000, value:1}
		],
		ram: [
    		{label: 'short', min:0, max:4, value:1},
    		{label: 'medium', min:6, max:8, value:3},
    		{label: 'enough', min:9, max: 20, value:5}	
		],
		hardDisk:[
			{label: 'small', min:0, max: 500, value:1},	
			{label: 'medium', min:500, max: 750, value:3},
			{label: 'large', min:750, max: 2048, value:5}		
		],
		screen:[
			{label: 'small', min:0, max: 13.9, value:1},
			{label: 'medium', min:13.9, max: 16, value:3},
			{label: 'large', min:16, max: 20, value:5}
		],
		state:[
			{label: 'Nueva', value: 5},
			{label: 'sincaja', value: 4},
			{label: 'exhibicion', value: 3},
			{label: 'restaurada', value: 2},
			{label: 'Usaado', value: 1},
		],
		peripheral:[
			{label: 'none', min:0, max: 0, value:0},
			{label: 'few', min:1, max: 4, value:3},
			{label: 'lot', min:5, max: 10, value:5},
		]
	});


