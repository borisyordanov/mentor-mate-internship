(function init() {
	document.querySelector('.controls').addEventListener('click', activate);
	var slides = document.querySelectorAll('.slide');

	function activate() {
		var checked = document.querySelector('.activator:checked').id;

		for (var i = 0; i < slides.length; i++) {
			slides[i].classList.remove('active');
		}

		document.querySelector('.slide:nth-of-type(' + checked + ')').classList.add('active');
	}
})();
