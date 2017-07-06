function extend(obj, src) {
    Object.keys(src).forEach(function(key) {
        obj[key] = src[key]; 
    });
    return obj;
}

function startGame() {
    var playerFactory = new PlayerFactory();
    
    //collect data from inputs for both players
    var playerData = {
        player1: {
            type: player1Inputs.querySelector('#type').value,
            location: player1Inputs.querySelector('#location').value,
            color: player1Inputs.querySelector('#color').value,
            name: player1Inputs.querySelector('#name').value,
            birthYear: player1Inputs.querySelector('#year').value,
            gender: player1Inputs.querySelector('#gender').value,
            fieldName: 'field1'

        },
        player2: {
            type: player2Inputs.querySelector('#type').value,
            location: player2Inputs.querySelector('#location').value,
            color: player2Inputs.querySelector('#color').value,
            name: player2Inputs.querySelector('#name').value,
            birthYear: player2Inputs.querySelector('#year').value,
            gender: player2Inputs.querySelector('#gender').value,
            fieldName: 'field2'
        }
    };
    
    //create new players with the collected data
    player1 = playerFactory.getPlayer((playerData.player1));
    player2 = playerFactory.getPlayer((playerData.player2));
   
    //display the fields for each player
    player1.initGameField();
    player2.initGameField();

    //handle clicks on the fields
    var player1Field = document.querySelector('.field1');
    var player2Field = document.querySelector('.field2');
    player1Field.addEventListener('click', function(event) {
        player1.receiveHit(event.target.dataset.id);
    });
    player2Field.addEventListener('click', function(event) {
        player2.receiveHit(event.target.dataset.id);
    });
}

function addShipToPlayer1() {
    //collect data from inputs for the ship
    var shipData = {
        type: player1Inputs.querySelector('#ship-type').value,
        location: player1Inputs.querySelector('#ship-location').value,
        orientation: player1Inputs.querySelector('#ship-orientation').value
    };
    //add the new ship to the player
    player1.addShip(shipData);
}

function addShipToPlayer2() {
    //collect data from inputs for the ship
    var shipData = {
        type: player2Inputs.querySelector('#ship-type').value,
        location: player2Inputs.querySelector('#ship-location').value,
        orientation: player2Inputs.querySelector('#ship-orientation').value

    };
    //add the new ship to the player
    player2.addShip(shipData);
}
