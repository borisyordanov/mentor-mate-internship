class Student extends Person {
    constructor(studentData) {
        super(studentData);
        this.placeOfStudy = studentData.location;
    }
};
