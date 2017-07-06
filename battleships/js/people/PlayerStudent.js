//combines Player and Student classes
function PlayerStudent(playerData) {
	Student.call(this, playerData);
	Player.call(this, playerData);
}
PlayerStudent.prototype = Object.create(Student.prototype);
PlayerStudent.prototype.constructor = PlayerStudent;
extend(PlayerStudent.prototype, Player.prototype);
