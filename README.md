# CalGuru

A social media platform for Berkeley students featuring location-based pins, photo sharing, and community circles.

## Features

### 📍 Pin Functionality
- **Interactive Map**: Click anywhere on the Berkeley map to create location pins
- **Photo Uploads**: Add multiple photos to each pin with drag-and-drop support
- **Captions**: Write short descriptions about what's happening at each location
- **Visual Markers**: Custom Berkeley-themed map markers (blue & gold)

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

5. Start the development server:
```bash
npm run dev
```

6. Open your browser to `http://localhost:5173`

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

## Project Structure

```
calguru/
├── src/
│   ├── components/
│   │   ├── Pins.jsx          # Main pins component with map
│   │   ├── Pins.css          # Pins styling
│   │   ├── Feed.jsx          # Feed placeholder
│   │   ├── Feed.css
│   │   ├── Profile.jsx       # Profile placeholder
│   │   └── Profile.css
│   ├── App.jsx               # Main app with navigation
│   ├── App.css               # App styling
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Technologies Used

- **React 18**: UI framework
- **Vite**: Build tool and dev server
- **Mapbox GL JS**: Interactive maps
- **react-map-gl**: React wrapper for Mapbox
- **Lucide React**: Beautiful icon library

## Future Enhancements

- Backend integration with user authentication
- Real-time pin updates
- Friend system and social features
- Comments and reactions on pins
- Search and filter functionality
- Pin categories and tags
- Notifications
- Mobile app version

## Contributing

This is a student project for the Berkeley community. Feel free to fork and customize for your needs!

## License

MIT License - feel free to use this for your own projects!
