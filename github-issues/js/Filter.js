class Filter {
	constructor(request, filterButtons, issueContainer) {
		this.request = request;
		this.filters = filterButtons;
		this.issueContainer = issueContainer;
	}

	pullRequests() {
		this.filters.pullRequests.classList.toggle("active");
		this.request.togglePullRequests();
		this.resetDisplay();
	}

	openIssues() {
		let currentState = this.request.getState();
		this.filters.openIssues.classList.toggle("active");

		if (currentState === ' ' && this.filters.closedIssues.classList.contains('active')) {
			this.request.setState('closed');
		} else if (currentState === ' ') {
			this.request.setState('open');
		} else if (currentState === 'closed' || currentState === 'open') {
			this.request.setState(' ');
		}
		this.resetDisplay();
	}

	closedIssues() {
		let currentState = this.request.getState();
		this.filters.closedIssues.classList.toggle("active");

		if (currentState === ' ' &&  this.filters.openIssues.classList.contains('active')) {
			this.request.setState('open');
		} else if (currentState === ' ') {
			this.request.setState('closed');
		} else if (currentState === 'open' || currentState === 'closed') {
			this.request.setState(' ');
		}
		this.resetDisplay();
	}

	createdDate() {
		const arrow = this.filters.age.querySelector('.icon-arrow');
		this.toggleSortOrder(arrow);
		this.request.setSort('created');
		this.resetDisplay();
		//update active filter
		this.filters.age.classList.add('active');
		this.filters.comments.classList.remove("active");
		this.filters.update.classList.remove('active');
	}

	comments() {
		const arrow = this.filters.comments.querySelector('.icon-arrow');
		this.toggleSortOrder(arrow);
		this.request.setSort('comments');
		this.resetDisplay();
		//update active filter
		this.filters.comments.classList.add("active");
		this.filters.age.classList.remove('active');
		this.filters.update.classList.remove('active');
	}

	updateDate() {
		const arrow = this.filters.update.querySelector('.icon-arrow');
		this.toggleSortOrder(arrow);
		this.request.setSort('updated');
		this.resetDisplay();
		//update active filter
		this.filters.update.classList.add('active');
		this.filters.age.classList.remove('active');
		this.filters.comments.classList.remove("active");
	}

	repo(e) {
		const oldRepo = this.request.getRepo();
		const oldActiveRepo = this.filters.repositories.querySelector(`[data-name='${oldRepo}']`);
		const newActiveRepo = this.getClickedRepo(e.target);
		this.request.setRepo(newActiveRepo.dataset.name);
		this.resetDisplay();
		//update active repo
		newActiveRepo.classList.add('active');
		oldActiveRepo.classList.remove('active');
	}

	toggleSortOrder(arrow) {
		//switches sort order in the request and the orientation of the arrow in the buttons
		let currentDirection = this.request.getOrder();
		if (currentDirection === 'desc') {
			this.request.setOrder('asc');
			arrow.classList.add('up');
			arrow.classList.remove('down');
		} else {
			this.request.setOrder('desc');
			arrow.classList.remove('up');
			arrow.classList.add('down');
		}
	}

	resetDisplay() {
		console.log('reseting');
		this.request.canLoad = false;
		this.request.setPage(1);
		this.issueContainer.innerHTML = '';
		this.request.loadIssues();
	}

	getClickedRepo(element) {
		//get the parent of the repo where a click event happened
		if (element.className.split(' ').indexOf('repo') >= 0) {
			return element;
		}
		return element.parentNode && this.getClickedRepo(element.parentNode);
	}
}
