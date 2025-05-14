import * as db from '$lib/server/db';
import { getTweetsFromChat, getChatsFromUser, type Chat, type Tweet} from '$lib/server/db_functions';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async () => {
	const lit_db = await db.openDb()
	const chats: Chat[] = await getChatsFromUser(lit_db, 0) //0 should be replaced with actual user id
	let tweets: Tweet[] = [];
	let currentChatTweets: Tweet[];

	for (var chat of chats) {
		currentChatTweets = await getTweetsFromChat(lit_db, chat.chat_id);
		tweets.push(...currentChatTweets);
		currentChatTweets = [];
	}
	tweets.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
	return{
		tweets
	}
};