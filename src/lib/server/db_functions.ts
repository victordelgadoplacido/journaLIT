import { Database } from 'sqlite'

export interface Tweet {
    id: number
    title: string
    content: string
    likes: number
    created: Date
}

export interface Chat {
    id: number
}

export async function getTweets(db :Database, tweetId: number): Promise<Tweet[]>{
    try {
        const row = await db.get('SELECT * FROM tweets WHERE id = ?', [tweetId]);
        return row;
    } catch (err) {
      throw new Error("THIS SHIT AINT WORKING FAM");
    }
}

export async function getChats(db :Database, userId: number): Promise<Chat[]>{   
    const row = await db.all('SELECT * FROM user_chat WHERE user_id = ?', [userId]);
    return row;
}