<script>
	export let segment;
</script>

<style>
	nav {
		border-bottom: 1px solid rgba(255,62,0,0.1);
		font-weight: 300;
		padding: 0 1em;
		text-align: right;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
	}

	.selected {
		position: relative;
		display: inline-block;
	}

	.selected::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255,62,0);
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}

	h1, figure, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		max-width: 400px;
		margin: 0 0 1em 0;
	}

</style>

<nav>
	<h1>Pubkey</h1>

	<figure>
		<img height=150 width=150  alt='' src='map.png'>
		<figcaption>
			Studio #2<br>
			Korte Zoutkeetsgracht 2<br>
			1013 MC Amsterdam<br>
		</figcaption>
	</figure>

	<ul>
		<li><a class='{segment === undefined ? "selected" : ""}' href='.'>intro</a></li>
		<li><a class='{segment === "about" ? "selected" : ""}' href='about'>about</a></li>
		<li><a class='{segment === "events" ? "selected" : ""}' href='events'>events</a></li>

		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
		<li><a rel=prefetch class='{segment === "blog" ? "selected" : ""}' href='blog'>blog</a></li>
	</ul>
</nav>