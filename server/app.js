require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.use(express.static('public/'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: './'});
});

// this only fetches 1 page. How do i check every page?
app.get('/get_repos', (req, res) => {
    let repos = [];
    async function getRepos() {
        try { 
            let response = await fetch('https://api.github.com/user/repos', {
                method: 'GET',
                headers: {
                    'Accept': 'application/vnd.github.mercy-preview+json',
                    'Authorization': `token ${process.env.GITHUB_AUTH}`,
                }
            });
            let data =  await response.json();

            for (repo in data) {
                repoInfo = {
                    'repo_name': data[repo].full_name,
                    'repo_desc': data[repo].description,
                    'repo_url': data[repo].url,
                }

                if (data[repo].topics == 'showoff') {
                    repos.push(repoInfo);
                    console.log(repoInfo);
                }
            }

            res.send(repos); 
            return;

        } catch (err) {
            console.error(err);
        }
        
    }
    getRepos();
});


app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});