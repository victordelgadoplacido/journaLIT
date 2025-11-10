<script lang="ts">
	import { Label } from "$lib/components/ui/label/index.js";
	import { Textarea } from "$lib/components/ui/textarea/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import DatePicker from "$lib/components/DatePicker.svelte";
	import { Checkbox } from "$lib/components/ui/checkbox/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import type { PageProps } from './$types';

	// Define the Chat type
	let { data }: PageProps = $props();
	

	//Create a dictionary to indicate selected chats
	
	var chat_selected: { [chat_id: number] : Boolean; } = {};

	// Initialize dictionary
	for (let chat of data.chats) {
		chat_selected[chat.chat_id] = false; // All chats are initially unselected
	}

	// Declare chats as a local variable and type it
	function toggleSelection(chatId: number) {
		if (chat_selected[chatId] == true) {
			chat_selected[chatId] = false;
		} else {
			chat_selected[chatId] = true;
		}
		
	}
	
	// Function to get all selected chats
	function getSelectedChats() {
		let selectedChatsIds = number[]; //Q coño hagoooooo
	  		for (let chat of data.chats) {
				if (chat_selected[chat.chat_id]) {
		  			selectedChatsIds.push(chat.chat_id);
	  }
	  
	  // You can do whatever you want with the selected chats here
	  // For example, you could store them in a variable or send them to an API
	  
	  return selectedChatsIds;
	}
	
	// Function to handle the button click
	  const selected: number[] = getSelectedChats();
	  const selected = getSelectedChats();
	  
	  if (selected.length === 0) {
		alert('No chats selected!');
	  } else {
		alert(`Selected ${selected.length} chat(s): ${selected.map(chat => chat.name).join(', ')}`);
	  }
	}
	</script>
	
	<div class="form">
	  <div class="grid w-full gap-1.5">
		<Label for="title" class="custom-label">Title</Label>
		<Textarea placeholder="Type in your post's title." id="title" />
	  </div>
	  
	  <div class="grid w-full gap-1.5">
		<Label for="explanation" class="custom-label">Event description</Label>
		<Textarea placeholder="Tell us what happened!" id="explanation"/>
	  </div>
	  
	  <div class="grid w-full max-w-sm items-center gap-1.5">
		<Label for="picture" class="custom-label">Picture</Label>
		<Input id="picture" type="file"/>
	  </div>
	  
	  <div class="chat-list">
		<Label for="picture" class="custom-label">Select Chats to View Tweet</Label>
		{#each data.chats as chat}
		  <div class="chat-item">
			<Checkbox
			  id={`chat-${chat.chat_id}`}
			  checked={chat.selected}
			  onCheckedChange={() => toggleSelection(chat.chat_id)}
			/>
			<label for={`chat-${chat.chat_id}`}>{chat.name}</label>
		  </div>
		{/each}
		
		<!-- Button to get selected chats -->
		<div class="button-container">
		  <Button on:click={handleGetSelectedChats} variant="default">
			Get Selected Chats
		  </Button>
		</div>
	  </div>
	  
	  <div class="grid w-full gap-1.5">
		<Label for="explanation" class="custom-label">Date</Label>
		<DatePicker />
	  </div>
	</div>
	
	<style>
	  .form {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		max-width: 1000px;
		padding: 1rem;
	  }
	  
	  .chat-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
	  }
	  
	  .button-container {
		margin-top: 1rem;
	  }
	</style>