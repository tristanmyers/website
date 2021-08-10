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

        for (let repo in data) {
            let repoInfo = {
                'repo_name': data[repo].repo_name,
                'repo_desc': data[repo].repo_desc,
                'repo_url': data[repo].repo_url,
            }

           repos.push(repoInfo)
        }
    } catch(err) {
        console.error(err);
    }

    for (let repo in repos) {
        const projectCard = document.createElement('project-card');
        projectCard.setAttribute('name', repos[repo].repo_name);
        projectCard.setAttribute('desc', repos[repo].repo_desc);
        projectCard.setAttribute('url', repos[repo].repo_url);
        projectsContainer.appendChild(projectCard);
    }
}

// getRepos();