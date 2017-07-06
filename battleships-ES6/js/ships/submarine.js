class Submarine extends Ship {
    constructor(shipData) {
        var type = 'Submarine';
        var size = 2;
        shipData.size = size;
        shipData.type = type;
        super(shipData);
    }
}
