import type { RequestHandler } from '@sveltejs/kit';
import { LikeTweet } from '$lib/server/db_functions';
import { OpenRouter } from '@openrouter/sdk';
import { APIKEY } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
	const form = await request.formData();

	let title = form.get('title') as string;
	let description = form.get('description') as string;
	const dateStr = form.get('date') as string;
	const selectedChatsJson = form.get('selectedChats') as string;
	const picture = form.get('picture') as File | null;
	const selectedChats = JSON.parse(selectedChatsJson);
	const date = new Date(dateStr);

	const newContent = await genPost(title, description, dateStr);
	if (newContent) {
		title = newContent.newTitle;
		description = newContent.newDescription;
	}
	return new Response(
		JSON.stringify({
			title,
			description,
			picture,
			date,
			selectedChats
		}),
		{
			headers: { 'Content-Type': 'application/json' }
		}
	);
};

const openRouter = new OpenRouter({
	apiKey: APIKEY
});

async function genPost(title: string, description: string, date: string) {
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
				Title: ${title}
				Description: ${description}
				Date: ${date}`
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
	const newTitle = parsed.title || 'Untitled';
	const newDescription = parsed.description || '';

	console.log('Generated Post:');
	console.log('Title:', newTitle);
	console.log('Description:', newDescription);
	return { newTitle: newTitle, newDescription: newDescription };
}
