var start = document.querySelector('#start');
var player1Inputs = document.querySelector('#player1');
var player2Inputs = document.querySelector('#player2');
var addShipPlayer1 = player1Inputs.querySelector('#add-ship');
var addShipPlayer2 = player2Inputs.querySelector('#add-ship');
var player1;
var player2;

addShipPlayer1.addEventListener('click', addShipToPlayer1);
addShipPlayer2.addEventListener('click', addShipToPlayer2);
start.addEventListener('click', startGame);