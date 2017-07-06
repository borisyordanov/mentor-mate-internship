class PlayerWorker extends Player(Worker) {
    constructor(playerData) {
        super(playerData);
        this.doesWork = true;
        this.doesPlay = true;
    }
}
