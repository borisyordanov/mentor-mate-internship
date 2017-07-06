function deleteLastSymbol() {
	//if input arr length is 1 - remove the last elem of the array
	if (inputArr[inputArr.length - 1].length === 1) {
		inputArr.pop();
	} else {
		//if input arr length is more than 1 - remove the last char of the last elem of the array
		inputArr[inputArr.length - 1] = inputArr[inputArr.length - 1].slice(0, -1);
	}
	updateDisplay();
}

function updateDisplay() {
	display.html(inputArr);
}

function changeLastOperator() {
	var lastOperator = inputArr[inputArr.length - 2];
	switch (inputArr.length) {
		case 0:
			break;
		case 1:
			inputArr.unshift('-');
			break;
		case 2:
			//toggle the last operator between plus and minus but don't allow the format "+num"
			if (lastOperator === '+' || lastOperator === '') {
				inputArr[inputArr.length - 2] = '-';
			} else if (lastOperator === '-') {
				inputArr.shift();
			}
			break;
		default:
			//toggle the last operator between plus and minus
			if (lastOperator === '+') {
				inputArr[inputArr.length - 2] = '-';
			} else if (lastOperator === '-') {
				inputArr[inputArr.length - 2] = '+';
			}
	}
}

function getOperatorAmount(arr) {
	var operatorAmount = 0;
	for (var i = 1; i < arr.length; i++) {
		if ('*/+-%'.indexOf(arr[i]) > -1) {
			operatorAmount++;
		}

	}
	return operatorAmount;
}

function operatorInputHandler(event) {
	if (inputArr.length > 0 && inputArr[inputArr.length - 1].match(/\d+/g) === null) {
		//check if the last elem of input array is an operator - overwrite it
		inputArr[inputArr.length - 1] = event.target.value;
	} else if (inputArr.length > 0) {
		//if the last elem of input array is a number add operator to input array 
		inputArr.push(event.target.value);
	}
	//check if array should be calculated
	if (getOperatorAmount(inputArr) >= 2) {
		calculateResult();
		updateDisplay();
	} else {
		updateDisplay();
	}
}

function numInputHandler(event) {
	if (inputArr.length === 0) {
		//add number to the input array
		inputArr.push(event.target.value);
		updateDisplay();
	} else if (inputArr.length > 0 && inputArr[inputArr.length - 1].match(/\d+/g) === null) {
		//if the last element in the array is an operator, push the number into the input array
		inputArr.push(event.target.value);
		updateDisplay();
	} else if (inputArr.length > 0 && inputArr[inputArr.length - 1].match(/\d+/g) !== null) {
		//if the last element in the array is a number, append the number into the last number
		inputArr[inputArr.length - 1] += event.target.value;
		updateDisplay();
	}
}

function recallMemory() {
	if (inputArr.length === 0) {
		//add memory to the input array
		inputArr.push(memory);
		updateDisplay();
	} else if (inputArr.length > 0 && inputArr[inputArr.length - 1].match(/\d+/g) === null) {
		//if the last element in the array is an operator, push the number into the input array
		inputArr.push(memory);
		updateDisplay();
	} else if (inputArr.length > 0 && inputArr[inputArr.length - 1].match(/\d+/g) !== null) {
		//if the last element in the array is a number, append the number into the last number
		inputArr[inputArr.length - 1] += memory;
		updateDisplay();
	}
}
