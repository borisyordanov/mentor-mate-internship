function Destroyer(shipData) {
    var type = 'Destroyer';
    var size = 1;
    shipData.size = size;
    shipData.type = type;
    Ship.call(this, shipData);
}
Destroyer.prototype = Object.create(Ship.prototype);
Destroyer.prototype.constructor = Destroyer;
