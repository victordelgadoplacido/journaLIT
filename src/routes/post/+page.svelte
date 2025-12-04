<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import DatePicker from '$lib/components/DatePicker.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { PageProps } from './$types';
	import ChatList from '$lib/components/ChatList.svelte';

	let { data }: PageProps = $props();

	// State for form inputs
	let title = $state('');
	let description = $state('');
	let pictureFile = $state<File | null>(null);
	let selectedDate = $state<Date | null>(null);

	// Use $state for reactivity in Svelte 5
	let chat_selected = $state<{ [chat_id: number]: boolean }>({});

	// Initialize dictionary
	for (let chat of data.chats) {
		chat_selected[chat.chat_id] = false;
	}

	// Function to toggle selection with proper reactivity
	function toggleSelection(chatId: number) {
		chat_selected[chatId] = !chat_selected[chatId];
	}

	// Function to get title
	function getTitle(): string {
		return title.trim();
	}

	// Function to get description
	function getDescription(): string {
		return description.trim();
	}

	// Function to get picture file
	function getPicture(): File | null {
		return pictureFile;
	}

	// Function to get selected date
	function getDate(): Date | null {
		return selectedDate;
	}

	// Function to get all selected chats
	function getSelectedChats() {
		let selectedChatsIds = [];
		for (let chat of data.chats) {
			if (chat_selected[chat.chat_id]) {
				selectedChatsIds.push(chat);
			}
		}
		return selectedChatsIds;
	}

	// Handle file input change
	function handleFileChange(event: Event) {
		const target = event.target as HTMLInputElement;
		if (target.files && target.files.length > 0) {
			pictureFile = target.files[0];
		}
	}

	// Handle date change from DatePicker
	function handleDateChange(date: Date | null) {
		selectedDate = date;
	}

	async function createPost() {
		const postData = new FormData();
		const picture = getPicture();
		const date = getDate();
		const selectedChats = getSelectedChats();
		const title = getTitle();
		const description = getDescription();

		if (!title) {
			alert('Please enter a title');
			return null;
		}
		if (!description) {
			alert('Please enter a description');
			return null;
		}
		if (selectedChats.length === 0) {
			alert('Please select at least one chat');
			return null;
		}
		if (!date) {
			alert('Please enter a date');
			return null;
		}
		if (picture) {
			postData.append('picture', picture);
		}
		if (date) {
			postData.append('date', date.toISOString());
		}
		postData.append('title', title);
		postData.append('description', description);
		postData.append('selectedChats', JSON.stringify(selectedChats.map((c) => c.chat_id)));

		await fetch('/api/create_post/', {
			method: 'POST',
			body: postData
		});

		console.log('Submited post data');
	}
</script>

<div class="form">
	<div class="grid w-full gap-1.5">
		<Label for="title" class="custom-label">Title</Label>
		<Textarea placeholder="Type in your post's title." id="title" bind:value={title} />
	</div>

	<div class="grid w-full gap-1.5">
		<Label for="explanation" class="custom-label">Event description</Label>
		<Textarea placeholder="Tell us what happened!" id="explanation" bind:value={description} />
	</div>

	<div class="grid w-full max-w-sm items-center gap-1.5">
		<Label for="picture" class="custom-label">Picture</Label>
		<Input id="picture" type="file" accept="image/*" onchange={handleFileChange} />
	</div>

	<div class="grid w-full gap-1.5">
		<Label for="date" class="custom-label">Date</Label>
		<DatePicker onDateChange={handleDateChange} />
	</div>

	<div class="chat-list">
		<Label for="chats" class="custom-label">Select Chats to View Tweet</Label>
		<ChatList chats={data.chats} {chat_selected} {toggleSelection} />

		<!-- Button to generate post -->
		<div class="button-container">
			<Button onclick={createPost} variant="default">Generate Post</Button>
		</div>
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

	.button-container {
		margin-top: 1rem;
	}
</style>
