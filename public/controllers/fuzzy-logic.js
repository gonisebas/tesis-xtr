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
    constant('weight', {state: 0.3, price: 0.25, ram: 0.25, screen: 0.1, hardDisk: 0.1}).
    constant('valuesRange',{
    	price: [
    		{label: 'very_economic', min:0, max:4375, value:5},	
    		{label: 'economic', min: 4375, max: 9375, value:4},
    		{label: 'reasonable', min: 9375, max: 14375, value: 3},
    		{label: 'expensive', min: 14375, max: 18125, value:2},
			{label: 'very_expensive', min: 18125, max: 99000, value:1}
		],
		ram: [
    		{label: 'short', min:0, max:5, value:1},
    		{label: 'medium', min:5, max:11, value:3},
    		{label: 'enough', min:11, max: 20, value:5}	
		],
		hardDisk:[
			{label: 'small', min:0, max: 576, value:1},	
			{label: 'medium', min:576, max: 1216, value:3},
			{label: 'large', min:1216, max: 2048, value:5}		
		],
		screen:[
			{label: 'small', min:0, max: 13.9, value:1},
			{label: 'medium', min:13.9, max: 16.5, value:3},
			{label: 'large', min:16.5, max: 30, value:5}
		],
		state:[
			{label: 'Nueva', value: 5},
			{label: 'sincaja', value: 4},
			{label: 'exhibicion', value: 3},
			{label: 'restaurada', value: 2},
			{label: 'Usaado', value: 1},
		]
	});


