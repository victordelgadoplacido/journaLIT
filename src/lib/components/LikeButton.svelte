<script lang="ts">
    import { onMount, tick } from 'svelte';
  
    export let tweet_id: number;
    export let likes: number;
  
    let likeCount = likes;
    let liked = false;
    let animate = false;
  
    // Check if user has liked this tweet
    // onMount(async () => {
    //   try {
    //     const res = await fetch(`/api/is-liked?tweetId=${tweet_id}`);
    //     if (res.ok) {
    //       const data = await res.json();
    //       liked = data.liked;
    //     }
    //   } catch (err) {
    //     console.error('Error checking liked status:', err);
    //   }
    // });
  
    async function toggleLike() {
      animate = true;
      const endpoint = liked ? '/api/unlike/' : '/api/like/';

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          body: JSON.stringify({tweet_id: tweet_id}),
          headers: { 'Content-Type': 'application/json'}
        });
  
        if (res.ok) {
          likeCount += liked ? -1 : 1;
          liked = !liked;
        }
      } catch (err) {
        console.error('Error toggling like:', err);
      }
  
      await tick();
      setTimeout(() => {
        animate = false;
      }, 300);
    }
  </script>
  
  <button
    on:click|stopPropagation={toggleLike}
    class="flex items-center gap-1 text-red-500 hover:text-red-600 font-medium transition-transform duration-300"
    class:scale-110={animate}
    aria-label={liked ? 'Unlike tweet' : 'Like tweet'}
  >
    {#if liked}
      <!-- Filled heart -->
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
                 C13.09 3.81 14.76 3 16.5 3
                 19.58 3 22 5.42 22 8.5
                 c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    {:else}
      <!-- Outline heart -->
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M4.318 6.318a4.5 4.5 0 0 1 6.364 0L12 7.636l1.318-1.318
                 a4.5 4.5 0 0 1 6.364 6.364L12 21.364 4.318 12.682
                 a4.5 4.5 0 0 1 0-6.364z"/>
      </svg>
    {/if}
    {likeCount}
  </button>
  
  <style>
    .scale-110 {
      transform: scale(1.2);
    }
  </style>
  