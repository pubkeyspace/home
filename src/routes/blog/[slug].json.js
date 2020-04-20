import {get_post} from './_posts.js';

export function get(req, res, next) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const { slug } = req.params;

	const post = get_post(slug)

	if (! post) {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}

	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(JSON.stringify(post));
}
