const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db'); 

const app = express();
const PORT = 5002;

app.use(cors());
app.use(bodyParser.json());

// Get all comments with nested replies
app.get('/comments', (req, res) => {
  db.all(`SELECT * FROM comments ORDER BY created_at ASC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    const map = {};
    const roots = [];

    rows.forEach(comment => {
      comment.replies = [];
      map[comment.id] = comment;
    });

    rows.forEach(comment => {
      if (comment.parent_id) {
        map[comment.parent_id].replies.push(comment);
      } else {
        roots.push(comment);
      }
    });

    res.json(roots);
  });
});

// Post a new comment or reply
app.post('/comments', (req, res) => {
  const { parent_id, author, content } = req.body;
  if (!author || !content) return res.status(400).json({ error: 'Missing author or content' });

  const stmt = db.prepare(`INSERT INTO comments (parent_id, author, content) VALUES (?, ?, ?)`);
  stmt.run(parent_id || null, author, content, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, parent_id, author, content });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});