
import fs from "fs";
import path from "path";
import grayMatter from "gray-matter";
import marked from "marked";
import hljs from "highlight.js";

export function all_posts() {
	return fs.readdirSync("content").map(fileName => {
		const post = fs.readFileSync(path.resolve("content", fileName), "utf-8");
		const {data, content} = grayMatter(post);

		// post.html = post.html.replace(/^\t{3}/gm, '');
		return {
			title: data.title,
			slug: data.slug,
			filename: fileName,
			body: content,
		};
	});
}

function loadFile(fileName) {
	return fs.readFileSync(path.resolve("content", `${fileName}.md`), "utf-8");
}

export function get_post(slug) {
	let found

	all_posts().forEach(post => {
		if(post.slug === slug) {
			found = post;
		}
	});

	if(! found) {
		return null;
	}

	const renderer = new marked.Renderer();

	// use hljs to highlight our blocks codes
	renderer.code = (source, lang) => {
		const { value: highlighted } = hljs.highlight(lang, source);
		return `<pre class='language-javascriptreact'><code>${highlighted}</code></pre>`;
	};

	found.html = marked(found.body, { renderer });

	return found;
}
