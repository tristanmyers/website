// project card custom element
class ProjectCard extends HTMLElement {
    constructor() {
        super();
                
        const shadow = this.attachShadow({mode: 'open'});

        const projectCardContainer = document.createElement('section');
        projectCardContainer.setAttribute('class', 'project-card-container');
        
        // card styling     
        shadow.innerHTML = 
        `
        <style>
        .project-card-container {
            background-color: #292E33;
            font-family: Noto Sans JP;
            display: flex;
            flex-direction: column;
            height: 100%;
            padding-bottom: 10px;
        }

        .project-image-container {
            height: 60%;
            width: 100%;
            padding: 5px 0px 10px 0px;
        }

        .project-image-container img{
            height: 100%;
            width: 100%;
        }

        a, a:visited{
            color: white;
        }

        #project-name {
            text-align: center;
        }

        #project-desc {
            padding-left: 5px;
        }

        #project-tags {
            padding-left: 5px;
        }
        </style>
        `
        
        // card content
        // will make this more dynamic for github api later
        // could turn this into an object
        const projectImageContainer = document.createElement('div');
        projectImageContainer.setAttribute('class', 'project-image-container');

        const projectImage = document.createElement('img');
        projectImage.setAttribute('src', 'https://images.pexels.com/photos/4451844/pexels-photo-4451844.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
        projectImage.setAttribute('alt', 'thumbnail for project');
        projectImageContainer.appendChild(projectImage)
        
        const projectName = document.createElement('a');
        projectName.setAttribute('id', 'project-name');
        projectName.setAttribute('href', 'https://nifty-heyrovsky-83f270.netlify.app/');
        projectName.innerHTML = 'Slapjack Card Game';

        const projectDesc = document.createElement('p');
        projectDesc.setAttribute('id', 'project-desc');
        projectDesc.innerHTML = `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Lorem ipsum dolor sit amet.`;

        const projectTags = document.createElement('p');
        projectTags.setAttribute('id', 'project-tags');
        projectTags.innerHTML = 'languages: js, html, scss/css';


        projectCardContainer.appendChild(projectImageContainer);
        projectCardContainer.appendChild(projectName);
        projectCardContainer.appendChild(projectDesc);
        projectCardContainer.appendChild(projectTags);

        shadow.appendChild(projectCardContainer);
        
    }

}

customElements.define('project-card', ProjectCard);

const projectsContainer = document.querySelector('#projects-container');

// could make this into a projectcard method and make constructor variables link to the response
let repos = [];
async function getRepos() {

    try {
        let response = await fetch('/get_repos', {
            method: 'GET',
            headers: {
                'accept': 'application/json'
            }
        });
        let data = await response.json();

        for (repo in data) {
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

    for (repo in repos) {
        const projectCard = document.createElement('project-card');
        projectsContainer.appendChild(projectCard);
    }
}

getRepos();