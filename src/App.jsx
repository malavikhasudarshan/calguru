import { useState, useEffect } from 'react'
import './App.css'
import Pins from './components/Pins'
import Feed from './components/Feed'
import Profile from './components/Profile'
import Inquiries from './components/Inquiries'

function App() {
  // Get initial tab from URL parameter or default to 'pins'
  const getInitialTab = () => {
    const params = new URLSearchParams(window.location.search)
    const tab = params.get('tab')
    return tab || 'pins'
  }

  const [activeTab, setActiveTab] = useState(getInitialTab())

  // Update URL when tab changes
  useEffect(() => {
    const url = new URL(window.location)
    url.searchParams.set('tab', activeTab)
    window.history.pushState({}, '', url)
  }, [activeTab])

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <a href="main.html" className="back-button">← Back to Home</a>
          <div className="header-text">
            <h1 className="app-title">CalGuru</h1>
            <p className="app-subtitle">Berkeley Student Community</p>
          </div>
        </div>
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
          className={`nav-button ${activeTab === 'inquiries' ? 'active' : ''}`}
          onClick={() => setActiveTab('inquiries')}
        >
          Inquiries
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
        {activeTab === 'inquiries' && <Inquiries />}
        {activeTab === 'profile' && <Profile />}
      </main>
    </div>
  )
}

export default App
