class Render {
	constructor(issuesTarget, reposTarget) {
		this.issuesDisplayTarget = issuesTarget;
		this.reposDisplayTarget = reposTarget;
	};

	issues(data) {
		const newIssues = document.createDocumentFragment();
		if (data.length === 0) {
			this.issuesDisplayTarget.textContent = 'No issues found with the selected filters!';
		} else {
			data.forEach((currentIssue) => {
				//create new div with the class of issue
				const issue = document.createElement('div');
				issue.classList.add('issue');

				if (currentIssue.pull_request) {
					//label issues that are also pull requests
					issue.textContent = 'Pull Request';
				}

				//add issue title
				const issueTitle = document.createElement('div');
				issueTitle.textContent = currentIssue.title;
				issueTitle.classList.add('title');
				issue.appendChild(issueTitle);

				//add issue number
				const issueNumber = document.createElement('div');
				issueNumber.textContent = `# ${currentIssue.number}`;
				issueNumber.classList.add('number');
				issue.appendChild(issueNumber);

				//add issue created date
				const issueCreatedDate = document.createElement('div');
				issueCreatedDate.textContent = `opened ${this.formatDate(currentIssue.created_at)}`;
				issueCreatedDate.classList.add('date');
				issueCreatedDate.classList.add('created');
				issue.appendChild(issueCreatedDate);

				//add issue author
				const issueAuthor = document.createElement('div');
				this.formatAuthor(issueAuthor, currentIssue);
				issue.appendChild(issueAuthor);

				//add issue update date
				const issueUpdatedDate = document.createElement('div');
				issueUpdatedDate.textContent = `updated ${this.formatDate(currentIssue.updated_at)}`;
				issueUpdatedDate.classList.add('date');
				issueUpdatedDate.classList.add('updated');
				issue.appendChild(issueUpdatedDate);

				//add issue comments amount
				const issueComments = document.createElement('div');
				issueComments.textContent = `comments: ${currentIssue.comments}`;
				issueComments.classList.add('comments');
				issue.appendChild(issueComments);;

				//add issue state Open/Closed
				const issueState = document.createElement('div');
				this.formatState(issueState, currentIssue.state);
				issue.appendChild(issueState);

				//add issue to fragment
				newIssues.appendChild(issue);
			});

			//add the new issues to the parent
			this.issuesDisplayTarget.appendChild(newIssues);

			if (data.length < 25) {
				//add a message if all issues are loaded
				this.issuesDisplayTarget.insertAdjacentHTML('beforeend', 'All issues loaded');
			}
		}
	}

	repos(repositories) {
		// Add repository statistics (watch, star, forks counters) 
		const newRepos = document.createDocumentFragment();
		let rank = 1;

		repositories.forEach((currentRepo) => {
			//repo container
			const repo = document.createElement('div');
			repo.classList.add('repo');
			repo.dataset.name = currentRepo.full_name;

			//add repo title
			const repoTitle = document.createElement('a');
			repoTitle.href = currentRepo.html_url;
			repoTitle.setAttribute('target', '_blank');
			repoTitle.textContent = `${rank}. ${currentRepo.full_name}`;
			repoTitle.classList.add('title');
			repo.appendChild(repoTitle);

			//add repo stars count
			const repoStars = document.createElement('div');
			const repoStarsIcon = document.createElement('span');
			repoStarsIcon.classList.add('icon-star');
			repoStars.appendChild(repoStarsIcon);
			repoStars.insertAdjacentHTML('beforeend', currentRepo.stargazers_count);
			repoStars.classList.add('stars');
			repo.appendChild(repoStars);

			//add repo fork count
			const repoForks = document.createElement('div');
			const repoForksIcon = document.createElement('span');
			repoForksIcon.classList.add('icon-fork');
			repoForks.appendChild(repoForksIcon);
			repoForks.insertAdjacentHTML('beforeend', currentRepo.forks_count);
			repoForks.classList.add('forks');
			repo.appendChild(repoForks);


			//add repo watcher count
			const repoWatchers = document.createElement('div');
			const repoWatchersIcon = document.createElement('span');
			repoWatchersIcon.classList.add('icon-eye');
			repoWatchers.appendChild(repoWatchersIcon);
			repoWatchers.insertAdjacentHTML('beforeend', currentRepo.watchers);
			repoWatchers.classList.add('watcher');
			repo.appendChild(repoWatchers);

			//add repo open issues
			const openIssues = document.createElement('div');
			const repoOpenIssuesIcon = document.createElement('span');
			repoOpenIssuesIcon.classList.add('icon-notification');
			openIssues.appendChild(repoOpenIssuesIcon);
			openIssues.insertAdjacentHTML('beforeend', currentRepo.open_issues_count);
			openIssues.classList.add('open-issues');
			repo.appendChild(openIssues);

			//append created repo to documetn gragment
			newRepos.appendChild(repo);

			rank++;
		});

		//add the new repos to the dom target
		this.reposDisplayTarget.appendChild(newRepos);
	}

	addRepoStats(totalIssuesAmount, repo) {
		// Add repository statistics (watch, star, forks counters) 
		//repo that is being updated
		const repoContainer = this.reposDisplayTarget.querySelector(`[data-name='${repo}']`);
		const newRepoStats = document.createDocumentFragment();

		//add repo closed issue count
		const openIssuesAmount = repoContainer.querySelector('.open-issues').textContent;
		const closedIssues = document.createElement('div');
		const closedIssuesIcon = document.createElement('span');
		const closedIssuesAmount = eval(totalIssuesAmount - openIssuesAmount);
		closedIssuesIcon.classList.add('icon-checkmark');
		closedIssues.appendChild(closedIssuesIcon);
		closedIssues.insertAdjacentHTML('beforeend', closedIssuesAmount);
		closedIssues.classList.add('closed-issues');
		newRepoStats.appendChild(closedIssues);

		//add repo total issues count
		const totalIssues = document.createElement('div');
		const totalIssuesIcon1 = document.createElement('span');
		const totalIssuesIcon2 = document.createElement('span');
		totalIssuesIcon1.classList.add('icon-notification'); //open issues icon
		totalIssuesIcon2.classList.add('icon-checkmark'); //closed issues icon

		totalIssues.appendChild(totalIssuesIcon1);
		totalIssues.insertAdjacentHTML('beforeend', '+ ');
		totalIssues.appendChild(totalIssuesIcon2);
		totalIssues.insertAdjacentHTML('beforeend', totalIssuesAmount);
		totalIssues.classList.add('total-issues');
		newRepoStats.appendChild(totalIssues);

		repoContainer.appendChild(newRepoStats); //append new stats to the repo that is updated
	}

	formatDate(date) {
		//convert a UTF date
		const pastDate = new Date(date);
		const currDate = Date.now();
		// get total difference in seconds between the times
		const delta = Math.abs(currDate - pastDate) / 1000;
		// calculate whole days
		const days = Math.floor(delta / 86400);
		// calculate whole hours
		const hours = Math.floor(delta / 3600) % 24;
		// calculate whole minutes
		const minutes = Math.floor(delta / 60) % 60;
		// what's left is seconds
		const seconds = delta % 60; // in theory the modulus is not required

		if (days > 0) {
			return `${days} days ago`;
		} else if (hours > 0) {
			return `${hours} hours ago`;
		} else if (minutes > 0) {
			return `${minutes} minutes ago`;
		} else if (seconds > 0) {
			return `${seconds} seconds ago`;
		}
	}

	formatAuthor(authorContainer, currentIssue) {
		//create an achor tag, add an href to the author's account and append the anchor to the container
		const anchorTag = document.createElement('a');
		authorContainer.textContent = 'by ';
		anchorTag.setAttribute('href', currentIssue.user.html_url);
		anchorTag.setAttribute('target', '_blank');
		anchorTag.textContent = currentIssue.user.login;
		authorContainer.appendChild(anchorTag);
		authorContainer.classList.add('author');
	}

	formatState(stateConteiner, currentState) {
		//add a class to the container of the state depending on the state of the issue
		stateConteiner.textContent = currentState;
		stateConteiner.classList.add('state');
		if (currentState === 'open') {
			stateConteiner.classList.add('open');
		} else {
			stateConteiner.classList.add('closed');
		}
	}
}
