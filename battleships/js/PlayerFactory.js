function PlayerFactory(playerData) {
    //move to separate file
}

PlayerFactory.prototype.getPlayer = function(playerData) {
    if (playerData.type === 'Worker') {
        return new PlayerWorker(playerData);
    } else if (playerData.type === 'Student') {
        return new PlayerStudent(playerData);
    } else {
        throw new Error("No such player type");
    }
};