var {log, error} = require('../lib/util')

if(typeof fetch === 'undefined') {
	var fetch = require('node-fetch')// jshint ignore:line
}

class HTTPError extends Error {}

async function post(url, input, {auth,type}) {
	const headers =  {
		'Accept': 'application/json',
	}

	if(type)
		headers['Content-Type'] = type

	if(auth)
		headers['Authorization'] = auth
	
	const req = {
		method: 'POST',
		body: input,
		headers: headers
	};

	const response = await fetch(url, req);

	log('fetch', url, response.status, response.statusText)

	if (!response.ok) {
		error('req', req)
		error('body', await response.text())
		throw new HTTPError('Fetch: ' + response.statusText);
	}

	return response;
}

// send a receive JSON
async function postJSON(url, input, {auth}) {
	const r = await post(url,
		JSON.stringify(input, null, 4),
		{auth, type: 'application/json'}
	)
	return r.json()
}

module.exports = {
    postJSON,
	post,
}