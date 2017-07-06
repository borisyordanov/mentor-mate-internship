class Worker extends Person {
    constructor(workerData) {
        super(workerData);
        this.placeOfStudy = workerData.location;
    }
};
