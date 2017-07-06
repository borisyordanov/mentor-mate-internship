function Player(playerData) {
	var hasLost = false;
	this.fieldName = playerData.fieldName;
	this.color = playerData.color;
	this.stats = {
		hits: 0,
		misses: 0,
		totalTurns: 0
	};
	this.getLoseStatus = function() {
		return hasLost;
	};
	this.setLoseStatus = function(newStatus) {
		hasLost = newStatus;
	};
}

Player.prototype.checkIfLost = function() {
	//a player looses if the availableShips array is empty
	if (this.field.availableShips.length === 0) {
		this.setLoseStatus(true);
		console.log(this.name + ' lost!');
	}
};

Player.prototype.initGameField = function() {
	//add field to player
	this.field = new GameField(this.color, this.fieldName);
	this.field.generate();
};

Player.prototype.addShip = function(shipData) {
	//add ship to player's field
	shipData.color = this.color;
	this.field.addShip(shipData);
};

Player.prototype.receiveHit = function(hitCell) {
	//check if a ship is on the hit cell and update stats
	var isHit = this.field.checkForShip(hitCell);

	if (isHit) {
		this.stats.hits++;
		//check if all ships are destroyed
		this.checkIfLost();
	} else {
		this.stats.misses++;
	}
	this.stats.totalTurns++;
};
