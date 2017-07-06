class Ship {
	constructor(shipData) {
		this.type = shipData.type;
		this.size = shipData.size;
		this.color = shipData.color || 'N/A';
		this.criticalHits = shipData.size;
		this.sustainedHits = 0;
		this.position = {
			start: +shipData.location,
			orientation: shipData.orientation
		};
		this.segments = {};

		var isSunk = false;

		this.checkIfSunk = function() {
			if (this.sustainedHits >= this.criticalHits) {
				isSunk = true;
			}
			return isSunk;
		};
	}
	setPosition() {
		//calculate the cells that the ship will be on and add the to the segments prop
		this.segments[this.position.start] = false;

		for (var i = 2; i <= this.size; i++) {
			if (this.position.orientation === 'vertical') {
				this.segments[this.position.start + 10 * (i - 1)] = false;
			} else {
				this.segments[this.position.start + (i - 1)] = false;
			}
		}
	};

	display(field) {
		//display all the ship's segments with the color of the player
		var fieldSelector = document.querySelector('.' + field);

		var newClass = 'cell-' + this.color;

		var currentSegment;
		for (var key in this.segments) {
			if (this.segments.hasOwnProperty(key)) {
				currentSegment = fieldSelector.querySelector('[data-id=' + key + ']');
				currentSegment.classList.add(newClass);
			}
		}
	};

	hitSegment(segment) {
		//specify that the segment is hit
		this.segments[segment] = true;

		//cells with ships on them that are hit are colored red
		var currentSegment = document.querySelector('[data-id=' + segment + ']');
		currentSegment.classList.add('cell-red');
	};
}
