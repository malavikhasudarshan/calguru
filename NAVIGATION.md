# CalGuru Navigation Guide

## Application Structure

CalGuru uses a multi-page structure with an animated entrance, grid navigation, and a React-based app.

## User Flow

### 1. Entrance Animation (`index.html`)

**URL**: `http://localhost:5173/`

**Features**:
- Animated "CALGURU" letters falling from the sky
- GSAP-powered smooth animations
- Letters rearrange into final position
- "Enter CalGuru →" link appears after animation
- Press Enter key or click link to proceed

**Navigation**:
- Click "Enter CalGuru →" or press Enter → Goes to `main.html`

---

### 2. Main Grid Navigation (`main.html`)

**URL**: `http://localhost:5173/main.html`

**Features**:
- 2x2 grid layout with four sections
- Bold, large typography (Inter 900 weight)
- Color-coded sections with hover effects
- Cursor trail effects

**Grid Sections**:

| Section | Color | Status | Destination |
|---------|-------|--------|-------------|
| **STUDY** | Light Blue (#A8D4E6) | ✅ Active | `sessions.html` |
| **ASK** | Muted Pink (#E8A0BF) | ✅ Active | `app.html?tab=inquiries` |
| **NEWS** | Forest Green (#2D6B3A) | ✅ Active | `news.html` |
| **PHOTO BOX** | Peach (#F4C4A8) | ✅ Active | `app.html?tab=pins` |

**Navigation**:
- **STUDY**: Opens study sessions page
- **ASK**: Opens React app on Inquiries tab
- **NEWS**: Opens cork board news page
- **PHOTO BOX**: Opens React app on Pins tab

---

### 3. React Application (`app.html`)

**URL**: `http://localhost:5173/app.html?tab={tabName}`

**Features**:
- Single-page React application
- Tab-based navigation
- URL parameter determines initial tab
- Back button returns to main grid

**Tabs**:

#### Feed (`?tab=feed`)
- Social feed with posts
- Category filters
- Like, comment, bookmark
- Trending topics
- Mock data for demonstration

#### Pins (`?tab=pins`)
- Interactive Mapbox map
- Location-based pins
- Photo uploads
- Privacy controls
- Berkeley campus centered

#### Inquiries (`?tab=inquiries`)
- Q&A system
- Category tags (10 categories)
- Sidebar filters
- Search functionality
- Multi-threaded conversations
- Backend integration (requires server)

#### Profile (`?tab=profile`)
- User profile display
- Stats (posts, friends, circles)
- Tabbed sections (About, Posts, Circles, Friends)
- Mock user data

**Navigation**:
- Click "← Back to Home" → Returns to `main.html`
- Click any tab → Updates URL and shows that tab
- Direct URL access with `?tab=` parameter works

---

### 4. News Page (`news.html`)

**URL**: `http://localhost:5173/news.html`

**Features**:
- Cork board background texture
- Pinned poster cards
- Rotated card effects
- Colorized text (character-by-character)
- Berkeley campus news and events

**Navigation**:
- Click "← Back to Home" → Returns to `main.html`

---

## URL Structure

```
CalGuru Application
│
├── / (index.html)
│   └── Entrance animation
│
├── /main.html
│   └── Grid navigation
│       ├── STUDY → /sessions.html
│       ├── ASK → /app.html?tab=inquiries
│       ├── NEWS → /news.html
│       └── PHOTO BOX → /app.html?tab=pins
│
├── /app.html?tab={tabName}
│   ├── ?tab=feed
│   ├── ?tab=pins
│   ├── ?tab=inquiries
│   └── ?tab=profile
│
├── /news.html
│   └── Cork board news
│
└── /sessions.html
    └── Study sessions organizer
```

## Quick Access URLs

### Development (Vite Dev Server)

- **Entrance**: `http://localhost:5173/`
- **Main Grid**: `http://localhost:5173/main.html`
- **Inquiries**: `http://localhost:5173/app.html?tab=inquiries`
- **Pins**: `http://localhost:5173/app.html?tab=pins`
- **Feed**: `http://localhost:5173/app.html?tab=feed`
- **Profile**: `http://localhost:5173/app.html?tab=profile`
- **News**: `http://localhost:5173/news.html`
- **Sessions**: `http://localhost:5173/sessions.html`

### Production Build

After running `npm run build`, the same structure applies:

- **Entrance**: `https://yourdomain.com/`
- **Main Grid**: `https://yourdomain.com/main.html`
- **Inquiries**: `https://yourdomain.com/app.html?tab=inquiries`
- etc.

## Navigation Components

### Back Buttons

All pages except the entrance have a back button:

- **React App**: "← Back to Home" (top-left in header)
- **News Page**: "← Back to Home" (top-left fixed position)

### Tab Navigation

The React app (`app.html`) has persistent tab navigation:

```
[Feed] [Pins] [Inquiries] [Profile]
```

- Active tab is highlighted in Berkeley Blue
- Clicking a tab updates the URL
- URL changes update the active tab

## Browser Behavior

### History Navigation

- **Back button**: Returns to previous page in history
- **Forward button**: Goes forward in history
- **URL changes**: Tabs update URL without page reload (pushState)

### Bookmarking

Users can bookmark any URL:
- `app.html?tab=inquiries` → Opens directly to Inquiries
- `main.html` → Opens grid navigation
- `index.html` → Shows entrance animation

### Deep Linking

Direct access to any tab works:
```javascript
// These all work as entry points:
app.html?tab=feed
app.html?tab=pins
app.html?tab=inquiries
app.html?tab=profile
```

## Mobile Navigation

On mobile devices (< 768px):

- Grid sections stack vertically on very small screens
- React app tabs may wrap or scroll
- Sidebar filters collapse or become full-width
- Back buttons remain accessible

## Keyboard Navigation

- **Enter key** on entrance page → Proceeds to main grid
- **Tab key** → Navigates through interactive elements
- **Arrow keys** → Map navigation (Pins tab)
- **Escape key** → Closes modals (Pins, Inquiries)

## Development Navigation

### Hot Reload

When running `npm run dev`:
- Changes to React components reload automatically
- Changes to HTML files require manual refresh
- CSS changes apply immediately

### Testing Different Entry Points

```bash
# Start dev server
npm run dev

# Then visit:
http://localhost:5173/              # Entrance
http://localhost:5173/main.html     # Grid
http://localhost:5173/app.html      # React app (default tab)
```

## Common Navigation Patterns

### First-Time User Flow

1. Land on entrance animation (`index.html`)
2. Watch CALGURU letters animate
3. Click "Enter CalGuru" → Go to grid (`main.html`)
4. Click "ASK" → Open Inquiries (`app.html?tab=inquiries`)
5. Browse inquiries, post questions
6. Click "← Back to Home" → Return to grid
7. Click "PHOTO BOX" → Open Pins (`app.html?tab=pins`)
8. Explore map, create pins

### Returning User Flow

1. Bookmark `app.html?tab=inquiries` for quick access
2. Visit bookmark → Directly opens Inquiries tab
3. Navigate between tabs using tab buttons
4. Use back button to return to grid when needed

### Power User Flow

1. Keep multiple tabs open:
   - Tab 1: `app.html?tab=inquiries` (monitoring questions)
   - Tab 2: `app.html?tab=feed` (checking social feed)
   - Tab 3: `news.html` (reading campus news)
2. Switch between browser tabs as needed

## Troubleshooting Navigation

### Page Not Found

If you see a 404 error:
- Ensure dev server is running (`npm run dev`)
- Check the URL is correct
- Try navigating from the entrance page

### Tab Not Loading

If a tab doesn't load in the React app:
- Check the URL parameter: `?tab=inquiries` (not `?tab=inquiry`)
- Valid tabs: `feed`, `pins`, `inquiries`, `profile`
- Default tab is `pins` if no parameter provided

### Back Button Not Working

If back button doesn't navigate:
- Check browser console for errors
- Ensure you're not on the entrance page (no back button there)
- Try using browser's back button instead

### Inquiries Not Loading

If Inquiries tab shows error:
- Ensure backend server is running on port 5002
- Start with: `./start-backend.sh` or `cd inquiries/backend && npm start`
- Check browser console for connection errors

## Future Navigation Enhancements

Planned improvements:
- [ ] Breadcrumb navigation
- [ ] Global search (accessible from any page)
- [ ] User menu with quick links
- [ ] Recently viewed pages
- [ ] Keyboard shortcuts (e.g., Cmd+K for search)
- [ ] Mobile bottom navigation bar
- [ ] Swipe gestures for tab navigation
- [ ] Progressive Web App (PWA) support

---

**Last Updated**: February 27, 2026  
**Version**: 2.0.0
