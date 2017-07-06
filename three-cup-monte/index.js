(function() {
	//variables for event listneers
	var initBtn = document.querySelector('#init');
	var startBtn = document.querySelectorAll('#start');
	var choiceBtn = document.querySelector('#submit-choice');
	var guessBtn = document.querySelector('#submit-guess');
	var restartBtn = document.querySelector('#restart-game');
	var quitBtn = document.querySelector('#quit-game');
	var resetBtn = document.querySelector('#reset-game');
	var cupImg = document.querySelectorAll('.cup');

	//containers of all major UI features that are hidden and shown depending on the step of the game
	var controlsContainer = document.querySelector('.controls-container');
	var statsContainer = document.querySelector('.stats-container');
	var cupsContainer = document.querySelector('.cups-container');
	var initialContainer = document.querySelector('.initial');
	var betsContainer = document.querySelector('.bets');
	var ballPlacer = document.querySelector('.ball-placer');
	var ballSelector = document.querySelector('.ball-selector');
	var gameRestart = document.querySelector('.game-restart');

	//DOM elements for displaying stats
	var statusMessage = document.querySelector('#status');
	var currentBet = document.querySelector('#current-bet');
	var playerNameContainer = document.querySelector('#player');
	var playerWallet = document.querySelector('#player-wallet');
	var dealerWallet = document.querySelector('#dealer-wallet');
	var cupParent;
	//game mode toggles
	var consoleGame = false;
	// game difficulty
	var level = 1;
	//the current game's bet input
	var betInput = document.querySelector('#bet');
	var betValue;
	//flag variable
	var isSelected = false;
	//player info
	var dealer = {
		name: 'Dealer',
		money: 0
	};

	var player = {
		name: 'Player',
		money: 0
	};

	//event listeners to game difficulty buttons
	for (var i = 0; i < startBtn.length; i++) {
		startBtn[i].addEventListener('click', startGame);
	}
	//event listeners to cup images
	for (var i = 0; i < cupImg.length; i++) {
		cupImg[i].addEventListener('animationend', shuffleHandler);
	}

	//event listeners to buttons
	initBtn.addEventListener('click', initGame);
	choiceBtn.addEventListener('click', getChoice);
	guessBtn.addEventListener('click', getWinner);
	restartBtn.addEventListener('click', restartGame);
	quitBtn.addEventListener('click', quitGame);
	resetBtn.addEventListener('click', resetGame);

	displayMessage('Who dis?');

	/* EVENT LISTENER CALLBACKS */
	function initGame() {
		//get the player name and the total amount of their money
		var wallet = document.querySelector('#wallet');
		var totalMoney = wallet.value;
		var playerNameInput = document.querySelector('#name');
		player.name = playerNameInput.value;
		player.money = +totalMoney;
		dealer.money = +totalMoney;
		//got to bet menu
		inputSwitch(initialContainer, betsContainer);
		displayMessage('Got money?');
	}

	function startGame(event) {
		displayMessage('Damn, son, you gots money!');
		level = +event.target.value;
		//get the bet and check if player is all in
		betValue = +betInput.value;
		//if player is all in
		if (betValue > player.money) {
			betValue = player.money;
		} else if (betValue > dealer.money) {
			betValue = dealer.money;
		}

		//go to ball place menu
		inputSwitch(betsContainer, ballPlacer);

		// print player names, bets and wallets
		displayStats();

		//if statement for game version
		if (consoleGame) {
			getCups(5);
			getTable(41);
		} else {
			cupsContainer.classList.remove('hide');
		}
	}

	function getChoice() {
		displayMessage('Aight!');
		inputSwitch(ballPlacer, ballSelector);
		//if statement for game version
		if (consoleGame) {
			//nothing to do
		} else {
			getBallLocation();
		}
	}

	function getWinner() {
		//if statement for game version
		if (consoleGame) {
			getWinnerConsole();
		} else {
			getWinnerUI();
		}
	}

	/* UI HELPERS */
	function getBallLocation() {
		cupParent = document.querySelectorAll('.cup-parent');
		// var ballString = '<img class="cup" src="img/cup.png"><img class="ball hide" src="img/ball.png">';
		var ballString = '<img class="ball" src="img/ball.png">';
		var choice = document.querySelector('input[name=cup-select]:checked');
		var cupWithBall = choice.value;
		var fpsInterval, startTime, endTime, now, then, elapsed, animation;
		//insert ball under selected cup
		var insertCup = document.querySelector('.' + cupWithBall);
		insertCup.insertAdjacentHTML('afterbegin', ballString);
		//lift selected cup
		liftCup(cupWithBall);
		isSelected = true;
	}

	function startAnimating(interval) {
		fpsInterval = 1000 / interval;
		then = Date.now();
		startTime = then;
		endTime = startTime + level * 3000;

		(function repeatShuffle() {
			animation = requestAnimationFrame(repeatShuffle);
			now = Date.now();
			elapsed = now - then;
			// if enough time has elapsed, draw the next frame
			if (elapsed > fpsInterval) {
				// Get ready for next frame by setting then=now, but also adjust for your
				// specified fpsInterval not being a multiple of RAF's interval (16.7ms)
				then = now - (elapsed % fpsInterval);
				// Put your drawing code here
				// debugger;
				shuffleCups(cupParent);
			}
			//stop animation if enough time has elapsed
			if (Date.now() > endTime) {
				cancelAnimationFrame(animation);
				displayMessage('Where is the ball, playa?');
			}
		})();
	}

	function shuffleCups(cupsArr) {
		var positions = [0, 1, 2];
		var classes = ['left', 'middle', 'right'];
		var position;
		var newClass;
		var movedCup;
		var movedCupClass;

		displayMessage('Lemme shuffle these here bitchez...');
		//add 2 random classes to 2 random cups 
		for (var i = 0; i < 2; i++) {
			//pick a random position
			position = getRandomElement(positions);
			//remove it form the array
			removeArrayElement(positions, position);
			//get cup that will be moved and it's class
			movedCup = cupsArr[position];
			movedCupClass = movedCup.classList[1];
			//pick the cup's new class
			newClass = getRandomElement(classes, movedCupClass);
			//remove the new class from the array
			removeArrayElement(classes, newClass);
			//remove all positioning classes
			movedCup.classList.remove('left');
			movedCup.classList.remove('middle');
			movedCup.classList.remove('right');
			//add new positioning classes
			movedCup.classList.add(newClass);
		}
		//find the cup that has not been modified in the loop above
		movedCup = cupsArr[positions[0]];
		//remove all positioning classes
		movedCup.classList.remove('left');
		movedCup.classList.remove('middle');
		movedCup.classList.remove('right');
		//add new positioning classes
		movedCup.classList.add(classes[0]);
	}

	function liftCup(className) {
		//find the cup that should be lifted
		var cup = document.querySelector('.' + className + ' .cup');
		//add lift animation
		cup.classList.add('move-up');
		isSelected = false;
	}

	function getWinnerUI() {
		//get player's guess
		var selectedInput = document.querySelector('input[name=cup-winner]:checked');
		//check if player wins
		var userChoice = document.querySelector('.' + selectedInput.value + ' img');
		var ballParent = document.querySelector('.ball').parentElement;
		var winLocation = ballParent.classList[1];
		//lift all cups
		liftCup('left');
		liftCup('middle');
		liftCup('right');

		if (userChoice.classList.contains('ball')) {
			updateWallet(player, dealer);
			displayWinner(player, winLocation);
		} else {
			updateWallet(dealer, player);
			displayWinner(dealer, winLocation);
		}
		displayStats();
	}

	function removeAllBalls() {
		var balls = document.querySelectorAll('.ball');
		var ballsParent;

		for (var i = 0; i < balls.length; i++) {
			ballsParent = balls[i].parentElement;
			ballsParent.removeChild(balls[i]);
		}
	}

	/* CONSOLE HELPERS */
	function getWinnerConsole() {
		//get player's guess
		var choice = document.querySelector('input[name=cup-winner]:checked').value;
		//choose ball location
		var randomLocation = getRandumNumber();
		//store location of the ball
		var ballLocation;
		//lift all cups and show ball
		getCups(5);
		printBall(randomLocation);
		getTable(41);
		//convert choice to numbers
		if (randomLocation === 0) {
			ballLocation = 'left';
		} else if (randomLocation === 1) {
			ballLocation = 'middle';
		} else if (randomLocation === 2) {
			ballLocation = 'right';
		}

		//check winner
		if (choice === ballLocation) {
			updateWallet(player, dealer);
			displayWinner(player, ballLocation);
		} else {
			updateWallet(dealer, player);
			displayWinner(dealer, ballLocation);
		}
		displayStats();
	}

	function getRandumNumber() {
		return Math.floor(Math.random() * 3);
	}

	function getCups(height) {
		var cup = [];
		var rows = height + 1;
		//columns are set so the cups have a correct angle to their sides
		var columns = rows * 2 + 1;
		//calculate the horizontal mid
		var mid = ((columns - columns % 2) / 2);

		for (var i = rows; i > 1; i--) {
			//add rows
			cup[i] = [];
			for (var j = 0; j < columns; j++) {
				if (i === rows) {
					//draw lowest row
					cup[i][j] = '_';
					cup[i][0] = '/';
					cup[i][columns - 1] = '\\';
				} else if (i === 2) {
					//draw top row
					cup[i][j] = ' ';
					cup[2][mid - 2] = '/';
					cup[2][mid - 1] = '\u203E';
					cup[2][mid] = '\u203E';
					cup[2][mid + 1] = '\u203E';
					cup[2][mid + 2] = '\\';
				} else if (2 < i < rows) {
					//draw rows between top and bottom
					cup[i][j] = ' ';
					cup[i][rows - i] = '/';
					cup[i][columns - (rows - i) - 1] = '\\';
				}
			}
		}
		printCups(cup, mid, rows);
	}

	function printCups(cup, mid, rows) {
		var output = '';
		//get each row of the cup
		for (var i = 2; i < cup.length; i++) {
			//print the row 3 times
			for (var j = 1; j <= 3; j++) {
				cup[Math.round(rows / 2)][mid] = j;
				output += cup[i].join('') + ' ';
			}
			output += '\n';
		}
		console.log(output);
	}

	function getTable(limit) {
		//generates a row with over scores
		var table = '';
		for (var i = 0; i < limit; i++) {
			table += '\u203E';
		}
		console.log(table);
	}

	function printSpaces(limit) {
		//prints blank spaces
		var output = '';
		for (var j = 0; j < limit; j++) {
			output += ' ';
		}
		return output;
	}

	function printBall(location) {
		//reset output
		var output = '';
		var firstCup,
			secondCup,
			thirdCup;
		//set the ball under the correct cup
		if (location === 0) {
			firstCup = '@ ';
			secondCup = 'X ';
			thirdCup = 'X ';
		} else if (location === 1) {
			firstCup = 'X ';
			secondCup = '@ ';
			thirdCup = 'X ';
		} else if (location === 2) {
			firstCup = 'X ';
			secondCup = 'X ';
			thirdCup = '@ ';
		}
		//print left offset
		output += printSpaces(6);
		//print first offset
		output += firstCup;
		//print offset between cups
		output += printSpaces(12);
		//print second offset
		output += secondCup;
		//print offset between cups
		output += printSpaces(12);
		//print third offset
		output += thirdCup;
		//print everything
		console.log(output);
	}

	/* GENERAL HELPERS*/
	function displayStats() {
		statsContainer.classList.remove('hide');
		//print bet info
		if (betValue === player.money) {
			currentBet.innerHTML = 'All in with ' + betValue + ' $';
		} else {
			currentBet.innerHTML = betValue + ' $';
		}
		//print the player's and dealer's money
		playerNameContainer.innerHTML = player.name || 'Player';
		playerWallet.innerHTML = player.money + ' $';
		dealerWallet.innerHTML = dealer.money + ' $';
	}

	function displayWinner(winner, ball) {
		var message;
		console.log(winner);
		displayMessage('Man, you cray-cray! The ball is under the ' + ball + ' cup, ' + winner.name + ' wins!');
		//hide ball selector
		ballSelector.classList.add('hide');
		if (player.money === 0) {
			//check if player lost and display message in UI
			message = 'Game over! ' + dealer.name + ' destroyed ' + player.name + '!';
			displayMessage(message);
		} else if (dealer.money === 0) {
			//check if dealer lost and display message in UI
			message = 'Game over! ' + player.name + ' destroyed ' + dealer.name + '!';
			displayMessage(message);
		}
		//display Play again? menu
		gameRestart.classList.remove('hide');
	}

	function restartGame() {
		gameRestart.classList.add('hide');
		betsContainer.classList.remove('hide');
		//reset input fields
		var radioButtons = document.querySelectorAll('input[type=radio]');
		for (var i = 0; i < radioButtons.length; i++) {
			radioButtons[i].checked = false;
		}
		displayMessage('Damn, you hard-core!');
		removeAllBalls();
		console.clear();
	}

	function resetGame() {
		gameRestart.classList.add('hide');
		cupsContainer.classList.add('hide');
		statsContainer.classList.add('hide');
		initialContainer.classList.remove('hide');

		//reset input fields
		var radioButtons = document.querySelectorAll('input[type=radio]');
		var textInput = document.querySelector('input[type=text]');
		var numberInputs = document.querySelectorAll('input[type=number]');

		textInput.value = '';
		for (var i = 0; i < radioButtons.length; i++) {
			radioButtons[i].checked = false;
		}
		for (var i = 0; i < numberInputs.length; i++) {
			numberInputs[i].value = '';
		}
		displayMessage('Who dis?');
		removeAllBalls();
		console.clear();
	}

	function quitGame() {
		controlsContainer.classList.add('hide');
		gameRestart.classList.add('hide');
		cupsContainer.classList.add('hide');
		displayMessage('Bye, loser!');
		console.clear();
	}

	function displayMessage(message) {
		statusMessage.innerHTML = message;
	}

	function getRandomElement(arr, filter) {
		var index = Math.floor(Math.random() * arr.length);

		if (arr[index] === filter) {
			return getRandomElement(arr, filter);
		}

		var result = arr.slice(index, index + 1)[0];
		return result;
	}

	function removeArrayElement(arr, element) {
		var index = arr.indexOf(element);
		if (index > -1) {
			arr.splice(index, 1);
		}
	}

	function updateWallet(winner, loser) {
		winner.money += betValue;
		loser.money -= betValue;
	}

	function shuffleHandler() {
		for (var i = 0; i < cupImg.length; i++) {
			cupImg[i].classList.remove('move-up');
		}
		if (isSelected) {
			ballPlacer.classList.add('hide');
			ballSelector.classList.remove('hide');
			startAnimating(level);
		}
	}

	function inputSwitch(off, on) {
		off.classList.add('hide');
		on.classList.remove('hide');
	}
})();
