var resultsContainer = document.querySelector('#results-container');
var purchasesContainer = document.querySelector('#purchases-container');
var submitButton = document.querySelector('#submit');
var buyButton = document.querySelector('#buy');
submitButton.addEventListener('click', initRequest);
buyButton.addEventListener('click', initBuy);

function removeRepetition(arr) {
	var a = [];
	for (i = 0; i < arr.length; i++) {
		var current = arr[i];
		if (a.indexOf(current) < 0) a.push(current);
	}

	arr.length = 0;
	for (i = 0; i < a.length; i++) {
		arr.push(a[i]);
	}

	return arr;
}

function initRequest() {
	//remove existing results
	resultsContainer.innerHTML = '';
	buyButton.classList.add('hide');
	//get search query
	var name = document.querySelector('#name').value;
	var type = document.querySelector('#type').value;
	var color = document.querySelector('#color').value;
	var price = document.querySelector('#price').value;
	//setting values in client object
	client.name = name;
	client.requestType = type;
	client.requestColor = color;
	client.requestPrice = Number(price);
	//send request
	client.createRequest();
}

function initBuy() {
	//add preloader
	var choices = document.querySelectorAll('input[type=checkbox]:checked');
	client.purchaseCar(choices);
	//update dropdown menus
	initStore();
}

function printResult(results, status) {
	//generate HTML with results data
	var resultTemplate = '';
	if (results[0] !== undefined) {
		//add success message and data if results are found
		for (var i = 0; i < results.length; i++) {
			resultTemplate +=
				'<div class="cars"><input class="checkbox" type="checkbox" id="car' + i + '"name="' + i + '"><p>Search Result: <span id="result">' + status +
				'</span></p><p>Car: <span id="car">' + results[i].make + ' ' + results[i].model +
				'</span></p><p>Type: <span id="type">' + results[i].type +
				'</span></p><p>Color: <span id="color">' + results[i].color +
				'</span></p><p>Price ($): <span id="price">' + results[i].price +
				'</span></p></div>';
			buyButton.classList.remove('hide');
		}

	} else {
		//add failure message if results are not found
		resultTemplate = '<div class="car"><p>Search Result: <span id="result">' + status + '</span></p></div>';
	}
	resultsContainer.classList.remove('hide');
	resultsContainer.innerHTML = resultTemplate;
}
//the inital collection of car objects
var carCollection = [{
	id: '1',
	make: 'Ford',
	model: '100',
	type: 'SUV',
	color: 'Black',
	price: 1000,
	forSale: true
}, {
	id: '2',
	make: 'Chevrolet',
	model: '200',
	type: 'SUV',
	color: 'Black',
	price: 800,
	forSale: true
}, {
	id: '3',
	make: 'Mercedes',
	model: '300',
	type: 'Estate',
	color: 'Blue',
	price: 3000,
	forSale: true
}, {
	id: '4',
	make: 'BMW',
	model: '400',
	type: 'Convertible',
	color: 'White',
	price: 4000,
	forSale: true
}, {
	id: '5',
	make: 'Citroen',
	model: '500',
	type: 'Convertible',
	color: 'Black',
	price: 5000,
	forSale: true
}];

var store = {
	available: carCollection.slice(0),
	//store.sold should be an array of object - each object with properties: carCollection[i], soldAt: Date, soldTo: 'Owner Name' 
	sold: [],
	sell: function(items, client) {
		// Method which will change the carCollection[i].forSale to false and move the car from store.available to store.sold
		var sell = [];
		var available = this.available;
		var searchId;
		//try to find a match for all items the client wants to buy
		for (var i = items.length - 1; i >= 0; i--) {
			searchId = items[i].id;
			for (var j = available.length - 1; j >= 0; j--) {
				if (available[j].id === searchId) {
					sell.push(available[j]);
					//add properties to sold cars
					available[j].forSale = false;
					available[j].buyer = client;
					available[j].sellDate = new Date();
					//remove sold car from available array
					var soldCar = available.splice(j, 1)[0];
					//move sold car to sold array
					this.sold.push(soldCar);
				}
			}
		}
		return sell;
	},
	checkRequest: function(requestType, requestColor, requestPrice) {
		// Method which will check if client request is valid (price, color, type and availability)
		var isFound = false;
		var result = [];
		for (var i = this.available.length - 1; i >= 0; i--) {
			if (this.available[i].type === requestType &&
				this.available[i].color === requestColor &&
				this.available[i].price <= requestPrice) {
				isFound = true;
				result.push(this.available[i]);
			}
		}
		return [isFound, result];
	},
	getOptions: function() {
		var types = [];
		var colors = [];
		for (var i = 0; i < this.available.length; i++) {
			types.push(this.available[i].type);
			colors.push(this.available[i].color);
		}
		return {
			foundTypes: removeRepetition(types),
			foundColors: removeRepetition(colors)
		};
	}
};

var client = {
	name: '',
	requestType: '',
	requestColor: '',
	requestPrice: 0,
	cart: [],
	createRequest: function() {
		var checkRequest = store.checkRequest(client.requestType, client.requestColor, client.requestPrice);
		if (checkRequest[0]) {
			this.offeredCars = (checkRequest[1]);
			//render success message with car data
			printResult(checkRequest[1], 'Found');
		} else {
			//render failure message
			printResult(checkRequest[1], 'Not Found');
		}
	},
	purchaseCar: function(choices) {
		var items = [];
		for (var i = 0; i < choices.length; i++) {
			document.querySelector('#' + choices[i].id + ' ~ p> span#result').innerHTML = 'Bought!';
			items.push(this.offeredCars[choices[i].name]);
		}
		//add entry in client.purchased and call store.sell
		var clientName = this.name;
		var result = store.sell(items, clientName);
		for (var j = 0; j < result.length; j++) {
			this.cart.push(result[j]);
		}
		displayPurchases(this.cart);
	},
	getAvailableOptions: function() {
		return store.getOptions();
	}
};

function initStore() {
	var result = client.getAvailableOptions();
	var typeDropdown = document.querySelector('#type');
	var colorDropdown = document.querySelector('#color');
	var typeOptions = '';
	var colorOptions = '';
	var resultLength;
	typeDropdown.innerHTML = '';
	colorDropdown.innerHTML = '';

	for (var i = 0; i < result.foundColors.length; i++) {
		colorOptions += '<option value="' + result.foundColors[i] + '">' + result.foundColors[i] + '</option>';
	}

	for (var j = 0; j < result.foundTypes.length; j++) {
		typeOptions += '<option value="' + result.foundTypes[j] + '">' + result.foundTypes[j] + '</option>';
	}

	typeDropdown.innerHTML = typeOptions;
	colorDropdown.innerHTML = colorOptions;
}

function displayPurchases(purchases) {
	//reset purchased cars list
	var purchasesTemplate = '';

	//add all purchased cars
	for (var i = 0; i < purchases.length; i++) {
		purchasesTemplate +=
			'<div class="cars"><p>Car: <span id="car">' + purchases[i].make + ' ' + purchases[i].model +
			'</span></p><p>Type: <span id="type">' + purchases[i].type +
			'</span></p><p>Color: <span id="color">' + purchases[i].color +
			'</span></p><p>Date: <span id="price">' + purchases[i].sellDate +
			'</span></p><p>Price ($): <span id="price">' + purchases[i].price +
			'</span></p></div>';
	}
	purchasesContainer.innerHTML = purchasesTemplate;
}
//update dropdown menus
initStore();
