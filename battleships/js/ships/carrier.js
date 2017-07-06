function Carrier(shipData) {
	var type = 'Carrier';
	var size = 5;
    shipData.size = size;
    shipData.type = type;
	Ship.call(this, shipData);
}
Carrier.prototype = Object.create(Ship.prototype);
Carrier.prototype.constructor = Carrier;
