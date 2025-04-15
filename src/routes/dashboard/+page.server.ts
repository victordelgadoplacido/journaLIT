import * as db from '$lib/server/db';
import sqlite, { Database } from 'sqlite'
import { getTweets } from '$lib/server/db_functions';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const tweet_db = await db.openDb()
	const tweets = getTweets(tweet_db)
	return {
		
	};
};

export async function getTweet(db :Database, tweetId: number): Promise<Tweet[]>{
    try {
      const row = await db.get('SELECT * FROM tweets WHERE id = ?', [tweetId]);
      return row;
    } catch (err) {
      throw new Error("THIS SHIT AINT WORKING FAM");
    }
}

