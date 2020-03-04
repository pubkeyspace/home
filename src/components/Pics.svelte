<script>
	import Swipe from "svelte-swipe/src/Swipe"
	import SwipeItem from "svelte-swipe/src/SwipeItem"

	let autoplay = false;
	let delay = 2000; //ms
	let showIndicators = true;
	let transitionDuration = 100; //ms
	let defaultIndex = 0; //start from 0
</script>

<style>
	.swipe-holder {
		height: 600px;
		max-height: 80vh;
		width: calc(100% + 1em);
		margin-left: -1em;
		margin-right: -1em;
	}
	img {
		width: 100%;
		height: auto;
	}
</style>

<div class="swipe-holder">
	<Swipe {showIndicators} {autoplay} {delay} {transitionDuration} {defaultIndex}>
		{#each [3,4,5,6,7] as i}
			<SwipeItem>
				<img src="/studio/img{i}.jpeg" alt="{i}">
			</SwipeItem>
		{/each}
	</Swipe>
</div>
