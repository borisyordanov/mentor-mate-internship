class Carrier extends Ship {
    constructor(shipData) {
        var type = 'Carrier';
        var size = 5;
        shipData.size = size;
        shipData.type = type;
        super(shipData);
    }
}
