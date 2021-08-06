// project card custom element
class ProjectCard extends HTMLElement {
    constructor() {
        super();
        
        const shadow = this.attachShadow({mode: 'open'});

        const projectCardContainer = document.createElement('section');
        projectCardContainer.setAttribute('class', 'project-card-container');
        projectCardContainer.setAttribute('part', 'card-container')

        const helloWorld = document.createElement('p');
        helloWorld.innerHTML = 'Hello World';
        // styling
        const style = document.createElement('style');
        style.textContent = ".project-card-container{width: 100px;height: 100px;border: 2px solid black;}"

        projectCardContainer.appendChild(helloWorld);
        projectCardContainer.appendChild(style);

        shadow.appendChild(projectCardContainer);
    }

}

customElements.define('project-card', ProjectCard);

const projectsContainer = document.querySelector('#projects-container');
const projectCard = document.createElement('project-card');

projectsContainer.appendChild(projectCard);
