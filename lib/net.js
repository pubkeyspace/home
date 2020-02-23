
var fetch = window.fetch || require('node-fetch') // jshint ignore:line

class HTTPError extends Error {}

async function postJSON(url, input, {auth}) {
	const headers =  {
		'Content-Type': 'application/json'
	}

	if(auth)
		headers['Authorization'] = auth

	const response = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(input),
		headers: headers
	});
	
	console.log('fetch', url, response.status, response.statusText)

	if (!response.ok) {
		throw new HTTPError('Fetch: ' + response.statusText);
	}

	return response.json();
}

module.exports = {
    postJSON: postJSON
}