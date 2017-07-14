var userAmount = localStorage.getItem('userAmount') || '10';
var nationalities = 'us,dk,fr,gb';
var dataLink = `https://randomuser.me/api/?results=${userAmount}&nat=${nationalities}`;
var dataType = 'json';
var isLoading = false;
var loader = document.querySelector('.cssload-container');
var destination = document.querySelector('.user-list');
var increaseBtn = document.querySelector('.up');
var decreaseBtn = document.querySelector('.down');
var userParent = document.querySelector('.user-list');
var displayAmount = document.querySelector('.words');

var colors = [
	'#1abc9c',
	'#3498db',
	'#9b59b6',
	'#34495e',
	'#f1c40f',
	'#e67e22',
	'#e74c3c',
	'#2ecc71',
	'#16a085',
	'Brown',
	'BurlyWood',
	'CadetBlue',
	'DarkCyan',
	'DarkGoldenRod',
	'DarkOliveGreen',
	'DarkOrange',
	'DarkSlateGray',
	'IndianRed',
	'thistle',
	'mistyrose',
	'coral'
];

var mySpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new mySpeechRecognition();
recognition.interimResults = false;


(function init() {
	//display user amount
	displayAmount.innerHTML = userAmount;
	//turn on loading animation
	loader.style.display = 'block';
	//Initial API fetch and display returned data
	getUserData();

	//Speech recognition
	recognition.addEventListener('result', e => {
		//convert speech data
		var transcript = Array.from(e.results)
			.map(result => result[0])
			.map(result => result.transcript)
			.join('');
		//display the speech data if it's a number
		if (!isNaN(transcript)) {
			toggleLoader();
			//update user amount
			userAmount = parseInt(transcript);
			updateDisplay();
		} else {
			alert('Try again, please');
		}
	});
	//triggers the speech recognition
	recognition.addEventListener('end', recognition.start);
	recognition.start();

	increaseBtn.addEventListener('click', function() {

		if (isLoading) return;

		//increase user amount
		userAmount++;
		// update UI
		toggleLoader();
		updateDisplay();
	});

	decreaseBtn.addEventListener('click', function() {

		if (isLoading) return;

		//check if decrease is possible
		if (userAmount > 1) {
			//decrease user amount
			userAmount--;
			// update UI
			toggleLoader();
			updateDisplay();
		} else {
			alert('Minimum value reached');
		}
	});
})();



function randomElement(arr) {
	// console.log(Math.floor(Math.random() * arr.length));
	return Math.floor(Math.random() * arr.length);
}

function toggleLoader() {
	//Turns the loading animation on or off
	if (loader.style.display === 'none') {
		loader.style.display = 'block';
	} else {
		loader.style.display = 'none';
	}
}

function getUserData() {
	//get api data

	isLoading = true;

	fetch(dataLink)
		.then((resp) => resp.json())
		.then(function(data) {
			//displays the api data
			useReturnData(data);
			toggleLoader();
		})
		.catch(function(error) {
			console.log(error);

		}).then(function() {
			isLoading = false;
		});
}

function returnUserTemplate(data, index, color) {
	return (
		`<div class='user' style='background-color: ${color}'><img src=' ${data.results[index].picture.medium} '>
			<p>Name: <span class='name'> ${data.results[index].name.first} ${data.results[index].name.last} </span></p>
			<p>Email: <span class='email'> ${data.results[index].email} </span></p>
			<p>Gender: <span clas='gender'> ${data.results[index].gender} </span></p>
		</div>`
	);
}

function useReturnData(data) {

	var i = data.results.length;
	//iterate each user that was received

	var userHolderString = '';

	while (i--) {
		var userHolder = returnUserTemplate(data, i, colors[randomElement(colors)]);

		userHolderString += userHolder;
	}

	//put each user in a div
	// var user = createDiv(userHolder, i);
	//append the user to the parent DOM element

	//create new div
	var newDiv = document.createElement('div');
	//insert HTML strong
	newDiv.innerHTML = userHolderString;

	destination.appendChild(newDiv);
}

function updateDisplay() {
	//Store the user value in the browser's local storage
	localStorage.setItem('userAmount', JSON.stringify(userAmount));
	//Update the value display in the UI
	displayAmount.innerHTML = userAmount;
	//Remove current 
	userParent.innerHTML = '';
	//update API call link
	dataLink = `https://randomuser.me/api/?results=${userAmount}&nat=${nationalities}`;
	//fetch and display API data
	getUserData();
}
