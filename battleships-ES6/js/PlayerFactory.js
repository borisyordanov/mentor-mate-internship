function PlayerFactory(playerData) {
}

PlayerFactory.prototype.getPlayer = function(playerData) {
    if (playerData.type === 'Worker') {
        return new PlayerWorker(playerData);
    } else if (playerData.type === 'Student') {
        return new PlayerStudent(playerData);
    } else {
        throw new Error('No such player type');
    }
};


var testData = {
    birthYear: '1990',
    color: 'blue',
    fieldName: 'field1',
    gender: 'male',
    location: 'Sofia',
    name: 'player1Name',
    type: 'Student'
};

