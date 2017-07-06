function Battleship(shipData) {
    var type = 'Battleship';
    var size = 4;
    shipData.size = size;
    shipData.type = type;
    Ship.call(this, shipData);
}
Battleship.prototype = Object.create(Ship.prototype);
Battleship.prototype.constructor = Battleship;
