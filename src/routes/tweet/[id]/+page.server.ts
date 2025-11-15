import * as db from '$lib/server/db';
import { getTweet, type Tweet } from '$lib/server/db_functions';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	let tweet_id: number | null;
	let tweet: Tweet;
	const lit_db = await db.openDb();

	// Get the tweet ID from the URL

	tweet_id = parseInt(params.id);

	if (tweet_id !== null) {
		const fetchedTweet = await getTweet(lit_db, tweet_id);
		if (!fetchedTweet) {
			throw new Error('Tweet not found');
		}
		tweet = fetchedTweet;
	} else {
		throw new Error('Tweet ID is null');
	}

	return tweet;
};
