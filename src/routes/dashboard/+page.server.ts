import * as db from '$lib/server/db';
import { getTweets, type Tweet } from '$lib/server/db_functions';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async () => {
	const tweet_db = await db.openDb()
	const tweets: Tweet[] = await getTweets(tweet_db, 1)
	console.log(tweets[0])
	return{
		tweets
	}
};

