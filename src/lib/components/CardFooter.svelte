<script lang="ts">
	import { onMount } from 'svelte';
    import LikeButton from './LikeButton.svelte';
	export let tweet_id: number;
    export let likes: number;
    export let created: Date;

</script>
      
<div class="card-footer w-full border p-4 rounded-xl shadow bg-white flex justify-between items-center">
	<!-- Left section: Like button and count -->
	<LikeButton tweet_id={tweet_id} likes={likes}/>

	<!-- Right section: Date -->
	<span class="text-sm text-gray-600">{new Date(created).toLocaleString()}</span>
</div>