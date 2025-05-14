<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
	import type { PageProps } from "./$types";
	import TweetCard from '$lib/components/TweetCard.svelte';
	let {data}: PageProps = $props();
	console.log("no prob");
</script>

<div class="max-w-2xl mx-auto py-8">
	{#each data.tweets as tweet}
	  <TweetCard
		title={tweet.title}
		description={tweet.description}
		likes={tweet.likes}
		created={tweet.created}
		author={tweet.author}   
		image={tweet.image}
		tweet_id={tweet.tweet_id} 
	  />
	{/each}
  </div>
