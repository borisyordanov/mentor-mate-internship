function Submarine(shipData) {
    var type = 'Submarine';
    var size = 2;
    shipData.size = size;
    shipData.type = type;
    Ship.call(this, shipData);
}
Submarine.prototype = Object.create(Ship.prototype);
Submarine.prototype.constructor = Submarine;
