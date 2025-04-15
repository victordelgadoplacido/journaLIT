import * as db from '$lib/server/db';
import { getChats, getTweets, type Chat, type Tweet} from '$lib/server/db_functions';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async () => {
	const lit_db = await db.openDb()
	const chats: Chat[] = await getChats(lit_db, 0)
	const tweets: Tweet[] = await getTweets(lit_db, 1)
	

	return{
		chats
		// tweets
	}
};