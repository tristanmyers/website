import ProjectCard from './ProjectCard.js'

let repos = [];

customElements.define('project-card', ProjectCard);

const projectsContainer = document.querySelector('#projects-container');

/* 
at document load, fetch the repos from github and and push the repoinfo objects to repos array     
then display each card on the site.
*/
async function getRepos() {

    try {
        let response = await fetch('/get_repos', {
            method: 'GET',
            headers: {
                'accept': 'application/json'
            }
        });
        let data = await response.json();

        repos.push(data);
                
    } catch(err) {
        console.error(err);
    }

    addRepos();
}

// creating card element and setting attributes to repo data so the card can render them.
function addRepos() {
    for (let repo in repos[0]) {
        const projectCard = document.createElement('project-card');
        projectCard.setAttribute('name', repos[0][repo].repo_name);
        projectCard.setAttribute('desc', repos[0][repo].repo_desc);
        projectCard.setAttribute('url', repos[0][repo].repo_url);
        projectCard.setAttribute('homepage', repos[0][repo].project_homepage);
        projectsContainer.appendChild(projectCard);
    }
    console.log(repos);
    
}

window.addEventListener('load', () => {
    getRepos();
});