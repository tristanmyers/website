- the development and main branch have different dir for the reference files because i am serving them over nodejs for local development.
- the github-pages branch uses relative dir for github pages environment

- fetching with the client reduces load times
	- i can't fetch private repos without server-side js
		because I can't use environment variables with client side js