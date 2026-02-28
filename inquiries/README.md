# Inquiries Backend

This is the backend server for the CalGuru Inquiries feature - a threaded comment system for Berkeley students.

## Quick Start

### Prerequisites
- Node.js 16+ installed

### Installation & Running

1. Install dependencies:
```bash
cd inquiries/backend
npm install
```

2. Start the server:
```bash
npm start
```

The server will run on `http://localhost:5002`

## API Endpoints

### GET /comments
Returns all comments with nested replies in a tree structure, sorted by most recent first.

**Response:**
```json
[
  {
    "id": 1,
    "parent_id": null,
    "author": "John Doe",
    "content": "What are the best study spots on campus?",
    "categories": ["Academic", "Campus Life"],
    "created_at": "2026-02-27T10:30:00.000Z",
    "replies": [
      {
        "id": 2,
        "parent_id": 1,
        "author": "Jane Smith",
        "content": "Moffitt Library 4th floor is great!",
        "categories": [],
        "created_at": "2026-02-27T10:35:00.000Z",
        "replies": []
      }
    ]
  }
]
```

### POST /comments
Creates a new inquiry or reply.

**Request Body (Top-level inquiry):**
```json
{
  "author": "John Doe",
  "content": "Where can I find affordable housing near campus?",
  "categories": ["Housing", "General"]
}
```

**Request Body (Reply):**
```json
{
  "parent_id": 1,
  "author": "Jane Smith",
  "content": "Check out the Berkeley Student Cooperative!"
}
```

**Response:**
```json
{
  "id": 3,
  "parent_id": 1,
  "author": "Jane Smith",
  "content": "Check out the Berkeley Student Cooperative!",
  "categories": []
}
```

## Database

Currently uses SQLite in-memory database for testing. Data is lost when the server restarts.

### Schema

```sql
CREATE TABLE comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  parent_id INTEGER,           -- NULL for top-level inquiries
  author TEXT NOT NULL,
  content TEXT NOT NULL,
  categories TEXT,             -- JSON array of category strings
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### Persistence

To persist data across server restarts, modify `db.js`:
```javascript
const db = new sqlite3.Database('./comments.db'); // file-based DB
```

## Categories

Available categories for inquiries:
- Academic
- Housing
- Social
- Career
- Campus Life
- Study Groups
- Events
- Food & Dining
- Transportation
- General

## CORS

CORS is enabled for all origins. In production, restrict this to your frontend domain.

## Technologies

- Express.js - Web framework
- SQLite3 - Database
- body-parser - Request parsing
- cors - Cross-origin resource sharing
