<script lang="ts">
	import { Label } from '$lib/components/ui/label/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import DatePicker from '$lib/components/DatePicker.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { PageProps } from './$types';
	import ChatList from '$lib/components/ChatList.svelte';
	import { OpenRouter } from '@openrouter/sdk';

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

	const openRouter = new OpenRouter({
		apiKey: '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' //	Replace with environmet variable
	});

	async function genPost() {
		const completion = await openRouter.chat.send(
			{
				model: 'gpt-4o',
				messages: [
					{
						role: 'system',
						content: `You are a content generator that creates catchy, newspaper-style posts.

						You will receive user input containing:
						- a title
						- a description
						- a date

						Your goal is to rewrite the post so that it sounds like a **breaking news headline** about a **celebrity event** — where the main character in the description is treated like a public figure or star.

						### Instructions
						1. Read the user input carefully.
						2. Identify the main character or subject in the description.
						3. Write a new, attention-grabbing **headline-style title** that makes the main character sound like a celebrity.
						4. Write a short, engaging **description** (1–3 sentences) that feels like a snippet from a news article, similar to what you might find in lifestyle or entertainment media.
						5. Keep the tone lively, professional, and exciting — avoid exaggeration or false claims.
						6. Always output valid JSON with exactly the following structure:

						\`\`\`json
						{
						"title": "new headline here",
						"description": "new engaging summary here"
						}
						\`\`\`

						### Example

						**User Input:**
						- title: "Local chef wins cooking contest"
						- description: "Jamie, a small-town cook, surprised judges at the annual food festival by winning first place for her handmade pasta dish."
						- date: "2025-03-21"

						**Expected Model Output:**
						\`\`\`json
						{
						"title": "Culinary Star Rises: Jamie Stuns Judges with Award-Winning Pasta",
						"description": "In a surprise victory at this year’s food festival, rising culinary talent Jamie captivated judges and audiences alike with her signature handmade pasta dish."
						}
						\`\`\`

						Now, generate your JSON response following these instructions and example.`
					},
					{
						role: 'user',
						content: `Create a social media post with the following details:
					Title: ${getTitle()}
					Description: ${getDescription()}
					Date: ${getDate()?.toDateString() || 'Not set'}`
					}
				]
			}

			//get the new title and description from the completion
		);
		const rawText = completion.choices?.[0]?.message?.content || '';

		// Try to find and parse JSON safely
		let parsed;
		try {
			// Extract JSON portion even if wrapped in markdown
			const jsonMatch = typeof rawText === 'string' ? rawText.match(/\{[\s\S]*\}/) : null;
			if (!jsonMatch) throw new Error('No JSON found in response.');
			parsed = JSON.parse(jsonMatch[0]);
		} catch (err) {
			console.error('Failed to parse model output:', err);
			console.log('Raw output was:', rawText);
			return null;
		}
		const title = parsed.title || 'Untitled';
		const description = parsed.description || '';

		console.log('Generated Post:');
		console.log('Title:', title);
		console.log('Description:', description);
		return { title, description };
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

	// Main function to collect all form data
	async function getPost() {
		const postData = {
			title: getTitle(),
			description: getDescription(),
			picture: getPicture(),
			date: getDate(),
			selectedChats: getSelectedChats()
		};

		// Validate required fields
		if (!postData.title) {
			alert('Please enter a title');
			return null;
		}

		if (!postData.description) {
			alert('Please enter a description');
			return null;
		}

		if (postData.selectedChats.length === 0) {
			alert('Please select at least one chat');
			return null;
		}

		const generatedPost = await genPost();
		if (generatedPost) {
			postData.title = generatedPost.title;
			postData.description = generatedPost.description;
		}
		console.log('Post Data:', postData);
		return postData;
	}

	// Function to handle the form submission
	async function handleGeneratePost() {
		const post = await getPost();

		if (post) {
			alert(
				`Post Created!\n\nTitle: ${post.title}\nDescription: ${post.description}\nPicture: ${post.picture ? post.picture.name : 'None'}\nDate: ${post.date ? post.date.toLocaleDateString() : 'Not set'}\nSelected Chats: ${post.selectedChats.map((chat) => chat.name || chat.chat_id).join(', ')}`
			);

			// Here you can send the data to your backend
			// await fetch('/api/create-post', { method: 'POST', body: JSON.stringify(post) });
		}
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
			<Button onclick={handleGeneratePost} variant="default">Generate Post</Button>
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
