import { useState } from 'react'
import './App.css'
import Pins from './components/Pins'
import Feed from './components/Feed'
import Profile from './components/Profile'

function App() {
  const [activeTab, setActiveTab] = useState('pins')

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">CalGuru</h1>
        <p className="app-subtitle">Berkeley Student Community</p>
      </header>
      
      <nav className="app-nav">
        <button 
          className={`nav-button ${activeTab === 'feed' ? 'active' : ''}`}
          onClick={() => setActiveTab('feed')}
        >
          Feed
        </button>
        <button 
          className={`nav-button ${activeTab === 'pins' ? 'active' : ''}`}
          onClick={() => setActiveTab('pins')}
        >
          Pins
        </button>
        <button 
          className={`nav-button ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
      </nav>

      <main className="app-content">
        {activeTab === 'feed' && <Feed />}
        {activeTab === 'pins' && <Pins />}
        {activeTab === 'profile' && <Profile />}
      </main>
    </div>
  )
}

export default App
