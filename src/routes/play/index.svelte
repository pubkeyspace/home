<style>
</style>
<script>
	function add(x) {

	}
</script>

<svelte:head>
	<title>Play</title>
</svelte:head>

<h1>Playground</h1>

<a href="/play/eliza">eliza</a>
<a href="/play/rand">rand</a>
<a href="/play/time">time</a>

<input
		placeholder="what needs to be done?"
		on:keydown={e => e.which === 13 && add(e.target)}
>