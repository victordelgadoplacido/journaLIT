<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import type { PageProps } from './$types';
    import LikeButton from '$lib/components/LikeButton.svelte';


    let tweet_id: number | null;
    let tweet: { title: string; description: string; author: string; image: string; created: Date; likes: number; content: string } | null = null;
    let { data }: PageProps = $props();

   
</script>

<div class="tweet-card w-full max-w-5xl mx-auto border p-5 rounded-xl shadow bg-white">
    <!-- Tweet Title -->
    <h1 class="text-2xl font-bold mb-2">{data.title}</h1>
  
    <!-- Tweet Author and Date -->
    <p class="text-sm text-gray-500 mb-4">
      by {data.author} on {data.created}
    </p>
  
    <!-- Tweet Content -->
    <p class="mb-4">{data.content}</p>
  
    <!-- Tweet Image (if available) -->
    {#if data.image}
      <!-- svelte-ignore a11y_img_redundant_alt -->
      <img src="{data.image}" alt="Tweet image" class="rounded-xl mb-4 max-w-full h-auto" />
    {/if}
  
    <!-- Tweet Likes -->
	<LikeButton tweet_id={data.tweet_id} likes={data.likes}/>
  </div>
  
  <style>
    .tweet-card {
      max-width: 1000px;
      margin: 0 auto;
    }
  </style>