<script>
	let chatlog = [
			'hi',
			'hi back',
			'think forward',
	]
	function send() {
		chatlog = [...chatlog, newmsg]
		newmsg = ''
	}
	let newmsg = '<blank>'
</script>


<style>
	p {
		padding: 1em;
	}
	h3 {
		display: block;
		background-color: #7d9cb3;
		margin: 0 0 1em 0;
		padding: 0.2em 1em;
		//border-bottom: thin solid black;
	}
</style>

<h3>chat</h3>
<ul>
	{#each chatlog as line}
		<li>{line}</li>
	{/each}
</ul>
<p>Type chat message:</p>
<p contenteditable="true" bind:innerHTML={newmsg}></p>
<button on:click={send}>Send</button>

