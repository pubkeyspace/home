<script>
	import Nav from '../components/Nav.svelte';
	import Chat from '../components/Chat.svelte';
	import Log from '../components/Log.svelte';
	import {log, devmode} from '../../lib/util';

	import { afterUpdate } from 'svelte';
	afterUpdate(() => {
		log('update', window.location)
	})

	export let segment;
</script>

<style>

	@media (min-width: 700px) {
		grid {
			display: grid;
			grid-template-columns: 1fr minmax(20em, 40em) 1fr;
			grid-template-rows: 1fr;
			grid-template-areas:
					"left main right";
			min-height: 100vh;
		}
	}
	@media (max-width: 700px) {
		grid {
			display: block;
			grid-template-columns: 1fr;
			grid-template-rows: 1fr 1fr 1fr;
			grid-template-areas: "left main";
		}
	}

	#left {
		background: #f6fafd;
		grid-area: left;
		text-align: right;
	}
	main {
		grid-area: main;
		position: relative;
		width: 100%;
		background-color: white;
		padding: 1em;
		margin: 0 auto;
		box-sizing: border-box;
		/* box-shadow: [horizontal offset] [vertical offset] [blur radius] [optional spread radius] [color]; */
		box-shadow: 0 0 8px 2px #ccccccff;
	}
	#right {
		grid-area: right;
		justify-self: stretch;
		align-self: start;
		padding: 0 1em 1em 1em;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	box {
		margin-top: 1em;
		position: relative;
		display: block;
		background: #f6fafd;
		width: 100%;
		max-width: 30em;
		min-height: 20em;
		padding: 0 0 1em 0;
	}
</style>

<grid>
	<div id=left>
		<Nav {segment}/>
	</div>
	<main>
		<slot></slot>
	</main>
	<div id="right">
		{#if devmode === true}
			<box><Chat/></box>
			<box><Log/></box>
		{/if}
	</div>
</grid>
