<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<script lang="ts">
	import type { PageProps } from "./$types";
	import { Button } from "$lib/components/ui/button/index.js";
	import TweetCard from '$lib/components/TweetCard.svelte';
	let {data}: PageProps = $props();
</script>

<div class="py-8">
	{#each data.tweets as tweet}
	  <TweetCard
		tweet_id={tweet.tweet_id} 
		title={tweet.title}
		description={tweet.description}
		likes={tweet.likes}
		created={tweet.created}
		author={tweet.author}   
		image={tweet.image}
	  />
	{/each}
	<div class="mt-4 flex justify-end">
		<Button href="/tweet/0" class="bg-blue-500 text-white hover:bg-blue-600">New Tweet</Button>
	</div>
</div>

