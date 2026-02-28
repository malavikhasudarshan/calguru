const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:'); // in-memory DB for testing

// Initialize table
db.serialize(() => {
  db.run(`CREATE TABLE comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    parent_id INTEGER,
    author TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

module.exports = db;