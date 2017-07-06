class Destroyer extends Ship {
    constructor(shipData) {
        var type = 'Destroyer';
        var size = 1;
        shipData.size = size;
        shipData.type = type;
        super(shipData);
    }
}
