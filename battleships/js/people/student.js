function Student(studentData) {
	Person.call(this, studentData);
	this.placeOfStudy = studentData.location;
}
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

