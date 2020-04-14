<script>
	import { onMount } from 'svelte';
	import { devmode, installHook } from 'lib/util';
	import { shims_version } from 'lib/shims';

	let events = [];
	let photos = [];

	onMount(async () => {
		const hook = installHook((level, event) => {
			events.push([level, ...event])
		})

		// returned function will be called when unmounted
		return () => hook.clear()
	});
</script>

<style>
	p {
		padding: 1em;
	}
	h3 {
		display: block;
		background-color: #78a29f;
		margin: 0 0 1em 0;
		padding: 0.2em 1em;
		border-bottom: thin solid black;
	}
</style>

<h3>debug log</h3>
<p>devmode = {devmode} shims = {shims_version}</p>
<ul>
	{#each events as event}
		<li>{event.join(' ')}</li>
	{/each}
</ul>
