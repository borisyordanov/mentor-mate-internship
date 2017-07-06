//combines Player and Worker classes
function PlayerWorker(playerData) {
	Worker.call(this, playerData);
	Player.call(this, playerData);
}
PlayerWorker.prototype = Object.create(Worker.prototype);
PlayerWorker.prototype.constructor = PlayerWorker;
extend(PlayerWorker.prototype, Player.prototype);