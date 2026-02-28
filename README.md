# CalGuru

A social media platform for Berkeley students featuring location-based pins, photo sharing, and community circles.

## Features

### 📍 Pin Functionality
- **Interactive Map**: Click anywhere on the Berkeley map to create location pins
- **Photo Uploads**: Add multiple photos to each pin with drag-and-drop support
- **Captions**: Write short descriptions about what's happening at each location
- **Visual Markers**: Custom Berkeley-themed map markers (blue & gold)

### 💬 Community Inquiries
- **Ask Questions**: Post one-sentence questions for the community to answer
- **Threaded Conversations**: Multi-level nested replies for in-depth discussions
- **Category System**: Tag inquiries with categories (Academic, Housing, Social, Career, etc.)
- **Filter & Search**: Sidebar filters by category and search bar to find specific topics
- **Real-time Updates**: See new inquiries and replies as they're posted
- **Conversation Management**: Show/hide reply threads to focus on what matters

### 🔒 Privacy Controls
- **Friends Only**: Share pins exclusively with your friends
- **Berkeley Community**: Make pins visible to all Berkeley students
- **Custom Circles**: Share with specific groups (Study Group, Roommates, Club Members, Classmates)

### 🎨 Modern UI
- Clean, responsive design with Berkeley colors (blue #003262 and gold #FDB515)
- Smooth animations and transitions
- Mobile-friendly interface
- Sidebar with pin list and map view

## Getting Started

### Prerequisites
- Node.js 16+ installed
- A Mapbox account (free tier is sufficient)

### Installation

1. Clone the repository:
```bash
cd calguru
```

2. Install dependencies:
```bash
npm install
```

3. Set up your Mapbox token:
   - Go to [Mapbox](https://www.mapbox.com/) and create a free account
   - Get your access token from the dashboard
   - Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   - Add your token to `.env`:
   ```
   VITE_MAPBOX_TOKEN=your_actual_token_here
   ```

4. Update the Mapbox token in the code:
   - Open `src/components/Pins.jsx`
   - Replace `YOUR_MAPBOX_TOKEN_HERE` with your actual token or use the environment variable

5. Start the backend server (for Inquiries feature):
```bash
cd inquiries/backend
npm install
npm start
```
This will start the backend on `http://localhost:5002`

6. In a new terminal, start the frontend development server:
```bash
npm run dev
```

7. Open your browser to `http://localhost:5173`

## Application Flow

1. **Entry Point** (`index.html`): Animated "CALGURU" entrance with falling letters
2. **Main Grid** (`main.html`): 2x2 grid navigation
   - **STUDY**: Opens study sessions organizer
   - **ASK**: Opens Inquiries tab in the React app
   - **NEWS**: Opens the cork board news page
   - **PHOTO BOX**: Opens Pins tab in the React app
3. **React App** (`app.html`): Main application with tabs
   - Feed, Pins, Inquiries, Profile

## Usage

### Creating a Pin
1. Click the "New Pin" button in the sidebar
2. Click anywhere on the map to place your pin
3. Add photos (optional)
4. Write a caption describing the location
5. Choose visibility (Friends or Berkeley Community)
6. Select circles to share with (optional)
7. Click "Create Pin"

### Viewing Pins
- All your pins appear in the sidebar
- Click on a pin card or map marker to see details
- Photos, captions, and visibility settings are displayed

### Using Inquiries
1. Click the "Inquiries" tab in the navigation
2. **Post a Question:**
   - Enter your name
   - Write a one-sentence question (max 200 characters)
   - Select at least one category (Academic, Housing, Social, etc.)
   - Click "Post Question"
3. **Browse & Filter:**
   - Use the sidebar to filter by category
   - Use the search bar to find specific topics
   - Click category filters to see related inquiries
4. **Reply & Discuss:**
   - Click "Reply" on any inquiry or response
   - Create multi-threaded conversations
   - Show/hide reply threads to manage long discussions
5. **Track Engagement:**
   - See reply counts on each inquiry
   - View timestamps (e.g., "2h ago", "Just now")
   - Monitor total inquiries in the sidebar stats

**Note:** Make sure the backend server is running on port 5002 for the Inquiries feature to work.

## Project Structure

```
calguru/
├── src/
│   ├── components/
│   │   ├── Pins.jsx          # Map-based pins component
│   │   ├── Pins.css
│   │   ├── Inquiries.jsx     # Q&A system
│   │   ├── Inquiries.css
│   │   ├── Feed.jsx          # Social feed
│   │   ├── Feed.css
│   │   ├── Profile.jsx       # User profile
│   │   └── Profile.css
│   ├── App.jsx               # Main app with navigation
│   ├── App.css
│   ├── main.jsx              # React entry point
│   └── index.css             # Global styles
├── inquiries/
│   ├── backend/
│   │   ├── server.js         # Express API server
│   │   ├── db.js             # SQLite database
│   │   └── package.json
│   └── README.md
├── js/
│   ├── cursor-trail.js       # Cursor effects
│   └── entrance.js           # Entrance animation
├── index.html                # Animated entrance (entry point)
├── main.html                 # 2x2 grid navigation
├── app.html                  # React app
├── news.html                 # Cork board news page
├── package.json
├── vite.config.js
└── README.md
```

## Technologies Used

### Frontend
- **React 18**: UI framework
- **Vite**: Build tool and dev server
- **Mapbox GL JS**: Interactive maps
- **react-map-gl**: React wrapper for Mapbox
- **Lucide React**: Beautiful icon library

### Backend (Inquiries)
- **Express.js**: Web framework
- **SQLite3**: Lightweight database
- **CORS**: Cross-origin resource sharing

## Future Enhancements

- Backend integration with user authentication
- Real-time pin updates using WebSockets
- Friend system and social features
- Persistent database for inquiries (currently in-memory)
- User profiles and avatars
- Search and filter functionality
- Pin categories and tags
- Notifications
- Like/upvote system for comments
- Mobile app version

## Contributing

This is a student project for the Berkeley community. Feel free to fork and customize for your needs!

## License

MIT License - feel free to use this for your own projects!
