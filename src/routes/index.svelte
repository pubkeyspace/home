
<script>

	import { onMount } from 'svelte';

	let Pics;
	let loading = true;

	onMount(async () => {
		let mod = await import("../components/Pics.svelte")
		Pics = mod.default;
		loading = false
		console.log('pics', Pics)
	});
</script>

<style>
	img{
		width: 100%;
		height: 600px;
		margin-left: -1em;
		margin-right: -1em;
	}
</style>

<svelte:head>
	<title>Pubkey.space — Community office space in Amsterdam</title>
</svelte:head>

<h1>Welcome</h1>

<p>
	Pubkey space is a small community space near the Spaardammerbuurt in Amsterdam.
	We offer dedicated desks for and flex space for a pay what you want system.
	See what you can expect:
</p>

{#if loading}
	<p>
		<img src="/studio/img2.jpeg" />
	</p>
{:else}
	<svelte:component this={Pics}/>
{/if}

<p>
	If you're interested in joining, <a href="mailto:hello@pubkey.space">send</a> us an email.
</p>