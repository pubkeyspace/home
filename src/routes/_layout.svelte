<script>
	import Nav from '../components/Nav.svelte';
	import Log from '../components/Log.svelte';

	export let segment;
</script>

<style>
	grid {
		display: grid;
		background: grey;
		grid-template-columns: 1fr minmax(20em, 40em) 1fr;
		grid-template-rows: 0 1fr auto;
		grid-template-areas:
				"head head head"
				"left main right"
				"foot foot foot";
		//grid-row-gap: 10px;
		//grid-column-gap: 10px;
		min-height: 100vh;
		justify-content: stretch;
	}
	header {
		grid-area: head;
		background: red;
	}
	#left {
		grid-area: left;
		text-align: right;
	}
	main {
		grid-area: main;
		position: relative;
		width: 100%;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
	#right {
		grid-area: right;
		justify-self: end;
		padding: 1em;
	}
	footer {
		grid-area: foot;
		text-align: center;
		height: 100px;
		max-height: 100px;
	}
</style>

<grid>
	<header>

	</header>
	<div id=left>
		<Nav {segment}/>
	</div>
	<main>
		<slot></slot>
	</main>
	<div id="right">
		<Log/>
	</div>
	<footer>
	</footer>
</grid>
