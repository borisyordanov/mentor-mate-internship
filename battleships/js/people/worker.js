function Worker(workerData) {
	Person.call(this, workerData);
	this.placeOfWork = workerData.location;
}
Worker.prototype = Object.create(Person.prototype);
Worker.prototype.constructor = Worker;
