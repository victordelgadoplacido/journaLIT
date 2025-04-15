import sqlite, { Database } from 'sqlite'
import { open } from 'sqlite'

interface Tweet {
    id: number
    title: string
    content: string
    likes: number
}

export async function getTweets(db :Database, tweetId: number): Promise<Tweet[]>{
    try {
        const row = await db.get('SELECT * FROM tweets WHERE id = ?', [tweetId]);
        return row;
    } catch (err) {
      throw new Error("THIS SHIT AINT WORKING FAM");
    }
}