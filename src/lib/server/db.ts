import Database from 'better-sqlite3';

let db: Database.Database | null = null;

export function openDb() {
  if (!db) {
    db = new Database('./database.db', { verbose: console.log }); // optional logging
  }
  return db;
}
