import Database from 'better-sqlite3';

export interface Tweet {
	tweet_id: number;
	title: string;
	description: string;
	likes: number;
	created: Date;
	image: string;
	author: string;
	chat_id: number;
	content: string;
}

export interface Chat {
	chat_id: number;
}

//Function that extracts array of tweets of a sepcific chat
export async function getTweetsFromChat(db: Database, chatId: number): Promise<Tweet[]> {
	try {
		const stmt = db.prepare('SELECT * FROM tweets WHERE chat_id = ?');
		return stmt.all(chatId);
	} catch (err) {
		throw new Error('THIS SHIT AINT WORKING FAM');
	}
}

//Function that extracts array of chats of a sepcific user
export async function getChatsFromUser(db: Database, userId: number): Promise<Chat[]> {
	console.log(db);

	const stmt = db.prepare('SELECT * FROM user_chat WHERE user_id = ?');
	return stmt.all(userId);
}

export function LikeTweet(db: Database.Database, tweetId: number): void {
	const stmt = db.prepare('UPDATE tweets SET likes = likes + 1 WHERE tweet_id = ?');
	stmt.run(tweetId);
}

export function UnlikeTweet(db: Database.Database, tweetId: number): void {
	const stmt = db.prepare('UPDATE tweets SET likes = likes - 1 WHERE tweet_id = ?');
	stmt.run(tweetId);
}

export function getTweet(db: Database.Database, tweetId: number): Tweet | undefined {
	const stmt = db.prepare('SELECT * FROM tweets WHERE tweet_id = ?');
	return stmt.get(tweetId);
}
// export async function getTweetIdFromUse(db :Database, userId: number): Promise<Chat[]>{
//     const row = await db.all('SELECT * FROM user_chat WHERE user_id = ?', [userId]);
//     return row;
// }
