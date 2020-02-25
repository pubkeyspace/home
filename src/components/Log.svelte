<script>
	let events = [
			'event1',
			'event2',
			'event3',
	]
	function addMsg() {
		console.log('here')
		events = [...events, 'new-msg']
	}
	let count = 4
	let name = 'myname'
	function upCount() {
		count = count + 1
	}
	let mode = process.env.NODE_ENV
</script>


<style>
	debug-log {
		position: relative;
		display: block;
		background: #a7d7d4;
		//border: thin solid black;
		width: 100%;
		min-height: 30em;
		padding: 6px;
		margin: 6px;
		z-index: 10;
	}
	h3 {
		display: block;
		background-color: #78a29f;
		margin: -6px -6px 6px -6px;
		padding: 4px;
		border-bottom: thin solid black;
	}
</style>

<debug-log>
	<h3>debug log</h3>
	<button on:click={addMsg}>Make Log Entry</button>
	<ul>
		{#each events as event}
			<li>{event}</li>
		{/each}
	</ul>
	<p>mode: {mode}</p>
</debug-log>