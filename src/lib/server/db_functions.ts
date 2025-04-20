import { Database } from 'sqlite'

export interface Tweet {
    tweet_id: number
    title: string
    description: string
    likes: number
    created: Date
    image: string
    author: string
    chat_id: number
}

export interface Chat {
    chat_id: number
}

//Function that extracts array of tweets of a sepcific chat
export async function getTweetsFromChat(db :Database, chatId: number): Promise<Tweet[]>{
    try {
        const row = await db.all('SELECT * FROM tweets WHERE chat_id = ?', [chatId]);
        return row;
    } catch (err) {
      throw new Error("THIS SHIT AINT WORKING FAM");
    }
}

//Function that extracts array of chats of a sepcific user
export async function getChatsFromUser(db :Database, userId: number): Promise<Chat[]>{   
    const row = await db.all('SELECT * FROM user_chat WHERE user_id = ?', [userId]);
    return row;
}

export async function LikeTweet(db :Database, tweetId: number){  
    const row = await db.run('Update tweets Set likes = likes + 1 Where tweet_id = ?', [tweetId]);
}



// export async function getTweetIdFromUse(db :Database, userId: number): Promise<Chat[]>{   
//     const row = await db.all('SELECT * FROM user_chat WHERE user_id = ?', [userId]);
//     return row;
// }
