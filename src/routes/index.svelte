
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
<p>Pubkey is a community and space in Amsterdam's Zeehelderbuurt. We are programmers, scientists, designers, researchers and theorists working on autonomous and collaborative projects as professionals and hobbyists.</p>
<p>We aim to be a hyper-local solution as to where to spare over a coffee with your newest ideas along side diverse expertise and experienced makers. We are the study you don't have in your home.</p>

<p>
	Pubkey space is a small community space near the Spaardammerbuurt in Amsterdam.
	We offer dedicated desks for and flex space for a pay what you want system.
	See what you can expect:
</p>

{#if loading}
	<p>
		<img src="/studio/img3.jpeg" />
	</p>
{:else}
	<svelte:component this={Pics}/>
{/if}

<p>Interested in joining? Send us an <a href="mailto:hello@pubkey.space">email</a>.</p>
