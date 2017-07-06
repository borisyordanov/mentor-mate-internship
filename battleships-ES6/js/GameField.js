class GameField {
    constructor(color, name) {
        var width = 10;
        var height = 10;
        this.color = color;
        this.name = name;
        this.maxShipAmount = 5;
        this.availableShips = [];
        this.sunkShips = [];
        this.shipsOnField = {};
    }
    generate() {
        /*generate html for insertion*/
        //parent for new field
        var fieldContainer = document.querySelector('.fields');

        //create new field
        var field = document.createElement('div');
        field.classList.add('field');
        field.classList.add(this.name);
        //generate rows
        var rows = document.createDocumentFragment();
        var rowAmount = 10;
        var cellAmount = 10;
        var cellNumber;

        for (var i = 1; i <= rowAmount; i++) {
            //create row and fill it with cell
            cellNumber = 10 * i;
            var row = document.createElement('div');
            row.classList.add('row');

            for (var j = 1; j <= cellAmount; j++) {
                //create cell and add data-id attribute
                cellNumber++;
                var cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.id = cellNumber;
                row.appendChild(cell);
            }

            rows.appendChild(row);
        }

        //add generated rows to the new field
        field.appendChild(rows);

        //add the field to the field parent
        fieldContainer.appendChild(field);
    };

    hitShip(ship, hitSegment) {
        //update the ship to reflect the hit
        ship.sustainedHits++;
        ship.hitSegment(hitSegment);
        if (ship.checkIfSunk()) {
            //if sunk - move ship from available ships to sunk ships
            this.sinkShip(ship);
        }
    };

    sinkShip(sinkingShip) {
        //move the ship to sunkShups and remove it from availableShips
        this.sunkShips.push(sinkingShip);
        var index = this.availableShips.indexOf(sinkingShip);
        this.availableShips.splice(index, 1);

        console.log(sinkingShip.type + ' is sunk');
    };

    addShip(shipData) {
        //check if there is room for more ships to be added
        var limitReached = this.availableShips.length === this.maxShipAmount;

        //check if ship that is added exists
        var typeExists = false;
        for (var i = 0; i < this.availableShips.length; i++) {
            if (this.availableShips[i].type === shipData.type) {
                typeExists = true;
            }
        }

        //add ship if there is room and if type is unique
        if (!limitReached && !typeExists) {
            var newShip = ShipFactory(shipData);
            newShip.setPosition();
            newShip.display(this.name);
            this.availableShips.push(newShip);
        } else if (limitReached) {
            throw new Error('Can\'t add more ships!');
        } else {
            throw new Error('This type of ship has already been added!');
        }

        //save all ship locations on the field when all ships are positioned
        if (this.availableShips.length === 5) {
            this.positionShips();
        }
    };

    positionShips() {
        //add all the segments of all the ships on the field into shipsOnField
        for (var i = 0; i < this.availableShips.length; i++) {

            this.availableShips[i].setPosition();

            for (var key in this.availableShips[i].segments) {
                if (this.availableShips[i].segments.hasOwnProperty(key)) {
                    this.shipsOnField[key] = this.availableShips[i];
                }
            }

        }
    };

    checkForShip(cellNumber) {
        //check if cell contains ship
        if (this.shipsOnField[cellNumber] !== undefined) {
            this.hitShip(this.shipsOnField[cellNumber], cellNumber);
            console.log(this.shipsOnField[cellNumber].type + ' was hit');
            return true;
        } else {
            console.log('miss');
            return false;
        }
    };
}
