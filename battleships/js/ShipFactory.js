function ShipFactory(shipData) {
    //move to separate file
    switch (shipData.type) {
        case 'Carrier':
            return new Carrier(shipData);
        case 'Battleship':
            return new Battleship(shipData);
        case 'Cruiser':
            return new Cruiser(shipData);
        case 'Submarine':
            return new Submarine(shipData);
        case 'Destroyer':
            return new Destroyer(shipData);
    }
}