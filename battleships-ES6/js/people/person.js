class Person {
    constructor(personData) {
        this.name = personData.name || 'Person';
        this.birthYear = personData.birthYear || 'N/A';
        this.gender = personData.gender || 'N/A';
    }
    getAge() {
        var currentTime = new Date();
        var currentYear = currentTime.getFullYear();
        console.log(currentYear - this.birthYear);
    };
}
