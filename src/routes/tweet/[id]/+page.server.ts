import * as db from '$lib/server/db';
import { getTweet, type Tweet} from '$lib/server/db_functions';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async ({ params }) => {
    let tweet_id: number | null;
    let tweet: { title: string; description: string; author: string; image: string; created: Date; likes: number; content: string; chat_id: number; tweet_id: number } | null = null;
    const lit_db = await db.openDb();

    // Get the tweet ID from the URL

    tweet_id = parseInt(params.id);
   
    if (tweet_id !== null) {
        tweet = await getTweet(lit_db, tweet_id);
    } else {
        throw new Error('Tweet ID is null');
    }
	
	return tweet;
    };
