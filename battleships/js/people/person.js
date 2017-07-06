function Person(personData) {
	if (this.constructor === Person) {
      throw new Error("Can't instantiate abstract class!");
    }
	this.name = personData.name || 'Person';
	this.birthYear = personData.birthYear || 'N/A';
	this.gender = personData.gender || 'N/A';
}

Person.prototype.getAge = function() {
	var currentTime = new Date();
	var currentYear = currentTime.getFullYear();
	console.log(currentYear - this.birthYear);
};