class App {
	constructor() {
		this.mainContainer = document.querySelector('.main-container');

		//results container
		this.issueContainer = this.mainContainer.querySelector('#issue-container');

		//filter buttons
		this.filterButtons = {
			pullRequests: this.mainContainer.querySelector('#pull-requests'),
			openIssues: this.mainContainer.querySelector('#open-issues'),
			closedIssues: this.mainContainer.querySelector('#closed-issues'),
			age: this.mainContainer.querySelector('#age'),
			comments: this.mainContainer.querySelector('#comments'),
			update: this.mainContainer.querySelector('#update'),
			repositories: this.mainContainer.querySelector('#repo-container')
		};

		//init classes
		this.render = new Render(this.issueContainer, this.filterButtons.repositories);
		this.request = new Request(this.render);
		this.filter = new Filter(this.request, this.filterButtons, this.issueContainer);

		//init tracker variables
		this.currScrollTime;
		this.lastItem;
		this.lastScrollTime = Date.now();
		this.checkInterval = 200;
		this.tracker;
	}

	init() {
		//filter buttons events listeners
		this.filterButtons.pullRequests.addEventListener('click', () => {
			this.filter.pullRequests();
		});
		this.filterButtons.openIssues.addEventListener('click', () => {
			this.filter.openIssues();
		});
		this.filterButtons.closedIssues.addEventListener('click', () => {
			this.filter.closedIssues();
		});
		this.filterButtons.age.addEventListener('click', () => {
			this.filter.createdDate();
		});
		this.filterButtons.comments.addEventListener('click', () => {
			this.filter.comments();
		});
		this.filterButtons.update.addEventListener('click', () => {
			this.filter.updateDate();
		});
		this.filterButtons.repositories.addEventListener('click', (e) => {
			this.filter.repo(e);
		});

		//track position of the scroll
		this.mainContainer.addEventListener('scroll', () => {
			this.scrollTracker();
		});

		//activate default filters
		this.filterButtons.pullRequests.classList.add('active');
		this.filterButtons.openIssues.classList.add('active');
		this.filterButtons.closedIssues.classList.add('active');
		this.filterButtons.age.classList.add('active');

		this.request.loadTopRepositories();

	}

	scrollTracker() {
		//checks the scroll location with an interval specified in the checkInterval variable
		if (!this.request.canLoad) {
			cancelAnimationFrame(scrollTracker);
		} else {
			this.currScrollTime = Date.now();
			if (this.lastScrollTime + this.checkInterval < this.currScrollTime) {
				this.checkScrollLocation();
				this.lastScrollTime = this.currScrollTime;
			}
			var scrollTracker = this.scrollTracker.bind(this);
			this.tracker = requestAnimationFrame(scrollTracker);
		}
	}

	checkScrollLocation() {
		this.lastItem = document.querySelector('#issue-container > div:last-child');
		//current location of the scroll
		const scrollLocation = (this.mainContainer.scrollTop + window.innerHeight);
		//the load point is 40% of the windows height from the top border of the last element on the page
		const loadPoint = this.lastItem.offsetTop - window.innerHeight * 0.4;
		//if the load point is reached - make a new request
		if (scrollLocation >= loadPoint && !this.request.isLoading) {
			this.request.loadIssues(this.issueContainer);
		}
	}
}
