class Request {
	constructor(render) {
		var pageNum = 1;
		var itemsPerRequest = 25;
		var clientID = '12c34bd33f1f77da4a75';
		var clientSecret = '3a357df22ceb24b55ab373445e3b4b31c4e27020';
		var state = ' ';
		var order = 'desc';
		var sort = 'created';
		var repo = 'facebook/react';
		var omitPullRequests = false;

		this.canLoad = true;
		this.incompleteRepos = [];
		this.render = render;

		this.increasePageNum = function() {
			pageNum++;
		};

		this.togglePullRequests = function() {
			if (omitPullRequests === false) {
				omitPullRequests = true;
			} else {
				omitPullRequests = false;
			}
		};

		this.getLink = function() {
			var link;
			if (omitPullRequests) {
				link = `https://api.github.com/search/issues?q=repo:${repo}+is:${state}+type:issue&client_id=${clientID}&client_secret=${clientSecret}&state=${state}&page=${pageNum}&per_page=${itemsPerRequest}&order=${order}&sort=${sort}`;
			} else {
				link = `https://api.github.com/search/issues?q=repo:${repo}+is:${state}&client_id=${clientID}&client_secret=${clientSecret}&sort=${sort}&order=${order}&page=${pageNum}&per_page=${itemsPerRequest}`;
			}
			document.querySelector('#link').href = link;
			return link;
		};

		this.setPage = function(newPageNum) {
			pageNum = newPageNum;
		};

		this.setState = function(newState) {
			state = newState;
		};

		this.getState = function() {
			return state;
		};

		this.setRepo = function(newRepo) {
			repo = newRepo;
		};

		this.getRepo = function() {
			return repo;
		};

		this.setOrder = function(newOrder) {
			order = newOrder;
		};

		this.getOrder = function() {
			return order;
		};

		this.setSort = function(newSort) {
			sort = newSort;
		};

		this.getSort = function() {
			return sort;
		};
	}

	loadIssues() {
		this.canLoad = false; //disable further loading
		fetch(this.getLink())
			.then((resp) => resp.json())
			.then((data) => {
				console.log(data);
				if (data.items.length < 25) {
					this.canLoad = false; //disable further loading
				} else {
					this.canLoad = true; //enable further loading
				}
				this.render.issues(data.items); //display the api data
				this.updateRepoStats(data); //add more stats to top 5 repos
				this.increasePageNum(); //increase the page number
			})
			.catch((error) => {
				throw new Error('Issues fetch error: ' + error);
			});
	}

	loadTopRepositories() {
		fetch(`https://api.github.com/search/repositories?q=stars:>1&sort=stars&client_id=12c34bd33f1f77da4a75&client_secret=3a357df22ceb24b55ab373445e3b4b31c4e27020&am&per_page=5`)
			.then((resp) => resp.json())
			.then((data) => {
				console.log(data);
				this.incompleteRepos = data.items.slice();
				this.render.repos(data.items);
			})
			.catch((error) => {
				throw new Error('Repos fetch error: ' + error);
			});
	}

	updateRepoStats(data) {
		//add extra stats to the currently displayed repo
		const currentRepo = this.getRepo();

		this.incompleteRepos.forEach((repo, index) => {
			if (repo.full_name === currentRepo) {
				this.render.addRepoStats(data.total_count, currentRepo);
				this.incompleteRepos.splice(index, 1);
			}
		});
	}
}
