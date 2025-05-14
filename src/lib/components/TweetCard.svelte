<script lang="ts">
	import { onMount } from 'svelte';
	import LikeButton from './LikeButton.svelte';
	import CardFooter from './CardFooter.svelte';
	export let tweet_id: number;
	export let title: string;
	export let description: string;
	export let likes: number;
	export let created: Date;
	export let author: string;
	export let image: string;
  </script>
  
<div class="tweet-card border p-4 rounded-xl shadow mb-4 bg-white">
	<h2 class="text-xl font-bold mb-1">{title}</h2>
	{#if author}
		<p class="text-sm text-gray-500 mb-2">by {author}</p>
	{/if}
	<p class="mb-2">{description}</p>
  
  	{#if image}
		<!-- svelte-ignore a11y_img_redundant_alt -->
		<img src="{image}" alt="tweet image" class="rounded-xl mb-2 max-w-full h-auto" />
	{/if}
  
	<div class="mt-2">
		<CardFooter 
			tweet_id={tweet_id} 
			likes={likes}
			created={created} />
	</div>
</div>

