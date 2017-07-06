class PlayerStudent extends Player(Student) {
    constructor(playerData) {
        super(playerData);
        this.doesStudy = true;
        this.doesPlay = true;
    }
}
