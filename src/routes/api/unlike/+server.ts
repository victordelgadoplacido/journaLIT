import type { RequestHandler } from '@sveltejs/kit';
import * as db from '$lib/server/db';
import { UnLikeTweet } from '$lib/server/db_functions';

export const POST: RequestHandler = async ({ request }) => {
  
  const { tweet_id } = await request.json();
  const lit_db = await db.openDb();

  await UnLikeTweet(lit_db, tweet_id);

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  });
};