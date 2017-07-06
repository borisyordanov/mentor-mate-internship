var results = [];
var operations = [{
	command: 'even',
	callback: getEvenNumbers
}, {
	command: 'odd',
	callback: getOddNumbers
}];


(function executeAllCallbacks() {
	//execute all callbacks
	for (var i = 0; i < operations.length; i++) {
		executeTask(operations[i].command, operations[i].callback);
	}
})();

function executeTask(command, callback) {
	//set timeout for callback
	setTimeout(callback, Math.round(1000 * Math.random()));
}

function getOddNumbers() {
	//get first 10 odd numbers
	var arr = [];
	for (var i = 1; i <= 20; i++) {
		if ((i % 2) === 0) {
			continue; //if num is odd, skip it.
		}
		arr.push(i);
	}
	console.log('odd generated');
	results.push(arr);
	checkResultAmount();
}

function getEvenNumbers() {
	//get first 10 even numbers
	var arr = [];
	for (var i = 2; i <= 20; i++) {
		if ((i % 2) === 0) {
			arr.push(i);
		}
	}
	console.log('even generated');
	results.push(arr);
	checkResultAmount();
}

function checkResultAmount() {
	//check if all callbacks gave been executed
	if (results.length > 0 && results.length === operations.length) {
		parseResult();
	}
}

function parseResult() {
	//merge all results into one array and square it
	var mergedResult = [];

	for (var i = 0; i < results.length; i++) {
		mergedResult.push(...results[i])
	}

	var squaredResult = mergedResult.map(function(num) {
		return num * num;
	});

	console.log(squaredResult);
}
