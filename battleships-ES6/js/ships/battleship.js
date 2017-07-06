class Battleship extends Ship {
    constructor(shipData) {
        var type = 'Battleship';
        var size = 4;
        shipData.size = size;
        shipData.type = type;
        super(shipData);
    }
}
