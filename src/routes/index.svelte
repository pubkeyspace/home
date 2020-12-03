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

img {
  width: 100%;
  height: 600px;
  margin-left: -1em;
  margin-right: -1em;
}

.bold {
  font-weight: bold;
}

.center {
  text-align: center;
}

button {
  margin-top: 2em;
  border: 0;
  background: #4E7B38;
  color: #fff;
  padding: 1em 2em 1em 2em;
  font-size: 16pt;
  cursor: pointer;
}

</style>

<svelte:head>
  <title>Pubkey.space — Community office space in Amsterdam</title>
</svelte:head>

<section>
<h1>Welcome</h1>
<p>Pubkey is a coworking space in Amsterdam's Zeeheldenbuurt. We are programmers, scientists, designers, researchers and theorists working on autonomous and collaborative projects as professionals and hobbyists.</p>
<p class="bold">We aim to be study you don't have in your home.</p>
</section>

<section>
  <div class="center">
    <a href="https://docs.google.com/forms/d/e/1FAIpQLSeMcaXPc_Q5bTXh08pOOkGV_iWX-CsX5TXRPpRTsLcLgRzwEQ/viewform?usp=sf_link"><button>Book a tour</button></a>
  </div>
</section>

<section>
<p>What you can expect:</p>
{#if loading}
	<p><img src="/studio/img1.jpg" alt="The Studio"/></p>
{:else}
	<svelte:component this={Pics}/>
{/if}
</section>

