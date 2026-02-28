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
  db.all(`SELECT * FROM comments ORDER BY created_at DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    const map = {};
    const roots = [];

    rows.forEach(comment => {
      comment.replies = [];
      // Parse categories from JSON string
      if (comment.categories) {
        try {
          comment.categories = JSON.parse(comment.categories);
        } catch (e) {
          comment.categories = [];
        }
      } else {
        comment.categories = [];
      }
      map[comment.id] = comment;
    });

    rows.forEach(comment => {
      if (comment.parent_id) {
        if (map[comment.parent_id]) {
          map[comment.parent_id].replies.push(comment);
        }
      } else {
        roots.push(comment);
      }
    });

    // Sort replies by created_at ASC (oldest first) for each thread
    roots.forEach(root => {
      if (root.replies.length > 0) {
        root.replies.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      }
    });

    res.json(roots);
  });
});

// Post a new comment or reply
app.post('/comments', (req, res) => {
  const { parent_id, author, content, categories } = req.body;
  if (!author || !content) return res.status(400).json({ error: 'Missing author or content' });

  // Convert categories array to JSON string
  const categoriesJson = categories ? JSON.stringify(categories) : null;

  const stmt = db.prepare(`INSERT INTO comments (parent_id, author, content, categories) VALUES (?, ?, ?, ?)`);
  stmt.run(parent_id || null, author, content, categoriesJson, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ 
      id: this.lastID, 
      parent_id, 
      author, 
      content,
      categories: categories || []
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});