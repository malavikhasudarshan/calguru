# CalGuru Setup Guide

Complete setup instructions for running CalGuru with all features.

## Prerequisites

- Node.js 20.19+ or 22.12+ (required for Vite)
- A Mapbox account (free tier)

## Step-by-Step Setup

### 1. Install Node.js (if needed)

If you're running Node.js 18.x or older, you need to upgrade:

```bash
# Install nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Restart your terminal or run:
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install Node.js 22 (latest LTS)
nvm install 22
nvm use 22
nvm alias default 22

# Verify installation
node --version  # Should show v22.x.x
npm --version   # Should show v10.x.x or higher
```

### 2. Clone and Install Dependencies

```bash
cd calguru

# Install frontend dependencies
npm install

# Install backend dependencies
cd inquiries/backend
npm install
cd ../..
```

### 3. Configure Mapbox Token

```bash
# Copy the example env file
cp .env.example .env

# Edit .env and add your Mapbox token
# Get your token from: https://www.mapbox.com/
```

Your `.env` file should look like:
```
VITE_MAPBOX_TOKEN=pk.eyJ1IjoieW91cnVzZXJuYW1lIiwiYSI6InlvdXJ0b2tlbiJ9.yoursecret
```

### 4. Start the Application

You need to run TWO servers:

#### Terminal 1: Backend Server (for Inquiries)

```bash
# Option 1: Use the start script
./start-backend.sh

# Option 2: Manual start
cd inquiries/backend
npm start
```

The backend will run on `http://localhost:5002`

#### Terminal 2: Frontend Development Server

```bash
# In the project root
npm run dev
```

The frontend will run on `http://localhost:5173`

### 5. Open the Application

Navigate to `http://localhost:5173` in your browser.

## Features Overview

### Pins Tab
- Click "New Pin" to create a location-based pin
- Click anywhere on the map to place it
- Add photos, captions, and set visibility

### Inquiries Tab
- Post questions and comments
- Reply to existing comments (threaded discussions)
- Real-time updates when new comments are posted

### Feed Tab
- Coming soon: Social feed of recent activity

### Profile Tab
- Coming soon: User profile and settings

## Troubleshooting

### "Vite requires Node.js version 20.19+"

You need to upgrade Node.js. See Step 1 above.

### "Unable to load comments" in Inquiries

Make sure the backend server is running on port 5002:
```bash
cd inquiries/backend
npm start
```

### Mapbox map not loading

1. Check that your `.env` file exists and has a valid token
2. Verify the token starts with `pk.`
3. Make sure you copied `.env.example` to `.env` (not `.env.example`)

### Port already in use

If port 5002 or 5173 is already in use:

```bash
# Find and kill the process using the port
lsof -ti:5002 | xargs kill -9  # For backend
lsof -ti:5173 | xargs kill -9  # For frontend
```

## Database Notes

The Inquiries backend currently uses an **in-memory SQLite database**. This means:
- ✅ No setup required
- ❌ All comments are lost when the server restarts

To persist data, edit `inquiries/backend/db.js`:

```javascript
// Change from:
const db = new sqlite3.Database(':memory:');

// To:
const db = new sqlite3.Database('./comments.db');
```

## Development Tips

### Hot Reload

Both servers support hot reload:
- Frontend: Changes to React components reload automatically
- Backend: Restart the server manually after changes

### Testing the API

Test the backend API directly:

```bash
# Get all comments
curl http://localhost:5002/comments

# Post a comment
curl -X POST http://localhost:5002/comments \
  -H "Content-Type: application/json" \
  -d '{"author":"Test User","content":"Hello world!"}'
```

## Next Steps

1. Add user authentication
2. Connect pins to a real database
3. Implement friend system
4. Add real-time updates with WebSockets
5. Deploy to production

## Need Help?

Check the main README.md for more information about features and architecture.
