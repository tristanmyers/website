// project card custom element
export default class ProjectCard extends HTMLElement {

    // couldn't use shadow in methods so i added parameter to constructor
    constructor(shadow) {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }
    
    // appending styling and card content to the shadow-root
    render = () => {
        const projectCardContainer = document.createElement('section');
        projectCardContainer.setAttribute('class', 'project-card-container');
        
        // card styling     
        this.shadow.innerHTML = 
        `
        <style>
        .project-card-container {
            background-color: #292E33;
            font-family: Noto Sans JP;
            display: flex;
            flex-direction: column;
            height: auto;
            width: auto;
            padding-bottom: 10px;
        }

        a, a:visited{
            color: white;
        }

        #project-name {
            text-align: start;
            width: auto;
            padding: 5px 0px 0px 5px;
        }

        #project-homepage-url {
            text-align: start;
            padding: 5px 0px 0px 5px;
        }

        #project-desc {
            padding-left: 5px;
        }
        </style>
        `

        const projectName = document.createElement('a');
        projectName.setAttribute('id', 'project-name');
        projectName.setAttribute('href', this.getAttribute('url'));
        projectName.innerHTML = this.getAttribute('name');

        const projectHomepage = document.createElement('a');
        projectHomepage.setAttribute('id', 'project-homepage-url');
        projectHomepage.setAttribute('href', this.getAttribute('homepage'));
        projectHomepage.innerHTML = 'homepage';

        const projectDesc = document.createElement('p');
        projectDesc.setAttribute('id', 'project-desc');
        projectDesc.innerHTML = this.getAttribute('desc');

        projectCardContainer.appendChild(projectName);
        projectCardContainer.appendChild(projectHomepage);
        projectCardContainer.appendChild(projectDesc);

        this.shadow.appendChild(projectCardContainer);
    }

    // called when the element is added to the dom 
    connectedCallback() {
        if (!this.rendered) {
            this.render();
            this.rendered = true;
        }
    }

    // watching for changes of these attributes
    static get observedAttributes() {
        return ['name', 'desc', 'url', 'homepage'];
    }

    // when a attribute changes call render
    attributeChangedCallback() {
        this.render();
    }
}









export class OldProjectCard extends HTMLElement {

    // couldn't use shadow in methods so i added parameter to constructor
    constructor(shadow) {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }
    
    // appending styling and card content to the shadow-root
    render = () => {
        const projectCardContainer = document.createElement('section');
        projectCardContainer.setAttribute('class', 'project-card-container');
        
        // card styling     
        this.shadow.innerHTML = 
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
        const projectImageContainer = document.createElement('div');
        projectImageContainer.setAttribute('class', 'project-image-container');

        const projectImage = document.createElement('img');
        projectImage.setAttribute('src', 'https://images.pexels.com/photos/4451844/pexels-photo-4451844.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
        projectImage.setAttribute('alt', 'thumbnail for project');
        projectImageContainer.appendChild(projectImage)

        const projectName = document.createElement('a');
        projectName.setAttribute('id', 'project-name');
        projectName.setAttribute('href', this.getAttribute('url'));
        projectName.innerHTML = this.getAttribute('name');

        const projectDesc = document.createElement('p');
        projectDesc.setAttribute('id', 'project-desc');
        projectDesc.innerHTML = this.getAttribute('desc');
        
        const projectTags = document.createElement('p');
        projectTags.setAttribute('id', 'project-tags');
        projectTags.innerHTML = 'languages: js, html, scss/css';
        
        
        projectCardContainer.appendChild(projectImageContainer);
        projectCardContainer.appendChild(projectName);
        projectCardContainer.appendChild(projectDesc);
        projectCardContainer.appendChild(projectTags);

        this.shadow.appendChild(projectCardContainer);
    }

    // called when the element is added to the dom 
    connectedCallback() {
        if (!this.rendered) {
            this.render();
            this.rendered = true;
        }
    }

    // watching for changes of these attributes
    static get observedAttributes() {
        return ['name', 'desc', 'url'];
    }

    // when a attribute changes call render
    attributeChangedCallback() {
        this.render();
    }
}