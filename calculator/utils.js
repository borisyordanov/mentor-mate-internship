/*DEFAULT TITLE SETTER*/
$('#title').html('Standard');
/*KEYBAORD EVENT LISTENERS*/
$('body').keydown(function(event) {
  $(".btn[value='" + event.key + "']").toggleClass('active-btn');
});

$('body').keyup(function(event) {
  $(".btn[value='" + event.key + "']").click();
  $(".btn[value='" + event.key + "']").toggleClass('active-btn');
});

/*BUTTONS EVENT LISTENERS*/
/*input buttons*/
$('#sqrt').click(function(event) {
  inputArr.push(event.target.value);
  updateDisplay();
});

$('#percent').click(function(event) {
  inputArr.push(event.target.value);
  updateDisplay();
});

$('.operator-btn').click(function(event) {
  operatorInputHandler(event);
});

$('.numeric-btn').click(function(event) {
  var canAddDecimal = event.target.value === '.' && (inputArr.length > 0) && inputArr[inputArr.length - 1].indexOf('.') > -1;
  //check if there is room on the display and if it's possible to add a decimal point
  if (inputArr.join("").length > maxChars || canAddDecimal) {
    return;
  }
  numInputHandler(event);
});

/*special standard buttons*/
$('#plus-minus').click(function(event) {
  changeLastOperator(inputArr);
  updateDisplay();
});
$('#return').click(function(event) {
  //check if there are operators and calculate result if they are
  calculateResult();
  updateDisplay(inputArr);
});

$('#delete').click(function() {
  deleteLastSymbol();
});

/*ADVANCED MODE LISTENERS*/
//toggle advanced buttons and title
$('#menu').click(function() {
  $('#advanced').toggleClass('hide');
  if ($('#title').html() === 'Standard') {
    $('#title').html('Advanced');
  } else {
    $('#title').html('Standard');
  }
});

/*special advanced buttons*/
$('#memory-save').click(function() {
  //check if the last element in the array is a number, append the number into the last number
  if (inputArr.length > 0 && inputArr[inputArr.length - 1].match(/\d+/g) !== null) {
    memory = inputArr[inputArr.length - 1];
  }
  $('#memory-clear').removeClass('disabled-btn');
  $('#memory-recall').removeClass('disabled-btn');
});

$('#memory-clear').click(function() {
  memory = '';
  $('#memory-clear').addClass('disabled-btn');
  $('#memory-recall').addClass('disabled-btn');
});

$('#memory-recall').click(function() {
  recallMemory();
});

$('#memory-subtraction').click(function() {
  var subtraction = calculate.subtract(memory, inputArr[inputArr.length - 1]);
  memory = subtraction.toString();
});

$('#memory-addition').click(function() {
  var addition = calculate.add(memory, inputArr[inputArr.length - 1]);
  memory = addition.toString();
});

$('#clear').click(function() {
  inputArr = [];
  updateDisplay();
});

$('#clear-entry').click(function() {
  inputArr.pop();
  updateDisplay();
});
