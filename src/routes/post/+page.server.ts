import * as db from '$lib/server/db';
import { getChatsFromUser, type Chat} from '$lib/server/db_functions';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async () => {
	let user_id = 0
	const lit_db = await db.openDb()
	const chats: Chat[] = await getChatsFromUser(lit_db, user_id) //0 should be replaced with actual user id

	return{
		chats
	}
};