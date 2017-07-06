class Cruiser extends Ship {
    constructor(shipData) {
        var type = 'Cruiser';
        var size = 3;
        shipData.size = size;
        shipData.type = type;
        super(shipData);
    }
}