<script>
	import {devmode} from '../../lib/util'

	export let segment;

	let maplink = 'https://www.openstreetmap.org/?mlat=52.3879&mlon=4.8853#map=16/52.3879/4.8853&layers=H'
</script>

<style>
	nav {
		padding: 1em 1em;
		text-align: right;
	}

	nav > * {
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
		position: relative;
		padding: 0 0 1em 0;
	}

	li a {
		padding: 0 0 0.5em 0;
	}

	li.selected a {
		border-bottom: #676778 solid 2px;
	}

	li:hover a {
		border-bottom: #676778 solid 2px;
	}

	a {
		text-decoration: none;
	}

	figure {
		margin: 1em 0 1em 0;
	}

	img {
		max-width: 400px;
		margin: 0 0 1em 0;
	}
	@media (max-width: 700px) {
		h1, li, figure, figcaption, ul {
			display: inline-block;
		}
		img { float: left; width: 50px; height: 50px; }
	}

	p {
		margin: 0;
		padding: 0;
	}
</style>

<nav>
	<a href="/"><h1>Pubkey</h1></a>

	<ul>
		<li class='{segment === undefined ? "selected" : ""}' ><a href='.'>intro</a></li>
		<li class='{segment === "coworking" ? "selected" : ""}'><a href='coworking'>coworking</a></li>
		<li class='{segment === "events" ? "selected" : ""}'><a href='events'>events</a></li>

	{#if devmode}
		<li class='{segment === "play" ? "selected" : ""}'><a href='play'>play</a></li>

		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
		<li class='{segment === "blog" ? "selected" : ""}'><a rel=prefetch href='blog'>blog</a></li>
	{/if}
	</ul>


	<a href={maplink}>
	<figure>
			<img height=150 width=150  alt='' src='map.png'>
		<figcaption>
				Studio #2<br>
				Korte Zoutkeetsgracht 2<br>
				1013 MC Amsterdam<br>
		</figcaption>
	</figure>
	</a>

	<p>
		<a href="mailto:hello@pubkey.space">hello@pubkey.space</a>
	</p>
</nav>
