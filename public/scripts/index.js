import ProjectCard from './ProjectCard.js'

// hard coding repos because im not using server to fetch private repos
let repos = [
	// {
	// 	'repo_name': 'Falling twitch emotes',
	// 	'repo_desc': 'This is a project for twitch.tv streams. I created a chatbot that watches for when someone puts an emote in the chat and sends a message over websockets to a server. The server renders the emote onto a canvas element that has physics, making the emote fall from the sky. I will be adding more to this project. Created with HTML, CSS, Javascript, Node.js',
	// 	'repo_url': 'no repo',
	// 	'project_homepage': 'https://i.imgur.com/3WbzjRi.mp4',
	// 	'repo_languages': 'HTML, CSS, Javascript, Node.js'
	// }
];
const projectsContainer = document.querySelector('#projects-container');

customElements.define('project-card', ProjectCard);


/* 
at document load, fetch the repos from github and and push the repoinfo objects to repos array     
then display each card on the site.
*/
async function getRepos() {
	try {
		let response = await fetch('https://api.github.com/users/tristanmyers/repos', {
			method: 'GET',
			headers: {
				'Accept': 'application/vnd.github.mercy-preview+json'
			}
		});
	  
		let data = await response.json();

		for (let repo in data) {
			let repoInfo = {
				'repo_name': data[repo].full_name,
				'repo_desc': data[repo].description,
				'repo_url': data[repo].html_url,
				'project_homepage': data[repo].homepage,
				'repo_languages': data[repo].language,
				'topics': data[repo].topics
			};

			if (data[repo].topics == 'showoff') {
				repos.push(repoInfo);
			}
		};
		
	} catch(err) {
		console.error(err);
	};

	return addRepos();
}

// creating card element and setting attributes to repo data so the card can render them.
function addRepos() {
	for (let i = 0; repos.length > i; i++) {
		const projectCard = document.createElement('project-card');
		projectCard.setAttribute('name', repos[i].repo_name);
		projectCard.setAttribute('desc', repos[i].repo_desc);
		projectCard.setAttribute('url', repos[i].repo_url);
		projectCard.setAttribute('homepage', repos[i].project_homepage);
		projectsContainer.appendChild(projectCard);
	};
}

window.addEventListener('load', () => {
	getRepos();
});