var display = $('#input');
var currentInput = '';
var inputArr = [];
var maxChars = 20;
var memory = '';

function calculateResult(arr) {
	var result;
	if (inputArr[0] === '-' || inputArr[0] === '.') {
		inputArr[1] = inputArr[0] + inputArr[1];
		inputArr.shift();
	} else if (inputArr[2] === '√') {
		inputArr[2] = calculate.sqrt(inputArr[3]);
		inputArr[3] = '';
	} else if (inputArr[3] === '%') {
		inputArr[2] = calculate.percent(inputArr[2]);
		inputArr[3] = '';
	}
	var operator = checkOperator(inputArr[1]);
	if (inputArr.length > 3 && inputArr[inputArr.length - 1] !== '') {
		result = operator.handler(inputArr[0], inputArr[2]).toString();
		inputArr = [result, inputArr[inputArr.length - 1]];
	} else {
		inputArr = [operator.handler(inputArr[0], inputArr[2]).toString()];
	}
}

function checkOperator(operator) {
	switch (operator) {
		case '%':
			return {
				handler: calculate.percent
			};
		case '√':
			return {
				handler: calculate.sqrt
			};
		case '*':
			return {
				handler: calculate.multiply
			};
		case '/':
			return {
				handler: calculate.divide
			};
		case '+':
			return {
				handler: calculate.add
			};
		case '-':
			return {
				handler: calculate.subtract
			};
	}
}

var calculate = {
	percent: function(el) {
		return +el / 100;
	},
	sqrt: function(el) {
		return Math.sqrt(+el);
	},
	multiply: function(el1, el2) {
		return el1 * el2;
	},
	divide: function(el1, el2) {
		return el1 / el2;
	},
	add: function(el1, el2) {
		return ((+el1) + (+el2));
	},
	subtract: function(el1, el2) {
		return el1 - el2;
	}
};
