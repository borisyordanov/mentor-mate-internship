function Cruiser(shipData) {
    var type = 'Cruiser';
    var size = 3;
    shipData.size = size;
    shipData.type = type;
    Ship.call(this, shipData);
}
Cruiser.prototype = Object.create(Ship.prototype);
Cruiser.prototype.constructor = Cruiser;
