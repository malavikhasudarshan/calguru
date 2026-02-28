import { useState, useRef } from 'react'
import Map, { Marker, Popup } from 'react-map-gl'
import { MapPin, Plus, X, Upload, Users, Globe } from 'lucide-react'
import './Pins.css'

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

const BERKELEY_CENTER = {
  latitude: 37.8719,
  longitude: -122.2585,
  zoom: 14
}

function Pins() {
  const [viewState, setViewState] = useState(BERKELEY_CENTER)
  const [pins, setPins] = useState([])
  const [selectedPin, setSelectedPin] = useState(null)
  const [isCreatingPin, setIsCreatingPin] = useState(false)
  const [newPinLocation, setNewPinLocation] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const fileInputRef = useRef(null)

  const [newPin, setNewPin] = useState({
    caption: '',
    images: [],
    visibility: 'friends',
    circles: []
  })

  const handleMapClick = (event) => {
    if (isCreatingPin) {
      setNewPinLocation({
        latitude: event.lngLat.lat,
        longitude: event.lngLat.lng
      })
      setShowCreateModal(true)
      setIsCreatingPin(false)
    }
  }

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files)
    const imageUrls = files.map(file => URL.createObjectURL(file))
    setNewPin(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls]
    }))
  }

  const removeImage = (index) => {
    setNewPin(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const handleCreatePin = () => {
    if (!newPinLocation || !newPin.caption) return

    const pin = {
      id: Date.now(),
      ...newPinLocation,
      ...newPin,
      createdAt: new Date().toISOString(),
      author: 'Current User'
    }

    setPins([...pins, pin])
    closeCreateModal()
  }

  const closeCreateModal = () => {
    setShowCreateModal(false)
    setNewPinLocation(null)
    setNewPin({
      caption: '',
      images: [],
      visibility: 'friends',
      circles: []
    })
  }

  const toggleCircle = (circleName) => {
    setNewPin(prev => ({
      ...prev,
      circles: prev.circles.includes(circleName)
        ? prev.circles.filter(c => c !== circleName)
        : [...prev.circles, circleName]
    }))
  }

  return (
    <div className="pins-container">
      <div className="pins-sidebar">
        <div className="sidebar-header">
          <h2>My Pins</h2>
          <button 
            className={`create-pin-btn ${isCreatingPin ? 'active' : ''}`}
            onClick={() => setIsCreatingPin(!isCreatingPin)}
          >
            <Plus size={20} />
            {isCreatingPin ? 'Click on map' : 'New Pin'}
          </button>
        </div>

        <div className="pins-list">
          {pins.length === 0 ? (
            <div className="empty-state">
              <MapPin size={48} color="#ccc" />
              <p>No pins yet</p>
              <p className="empty-hint">Click "New Pin" to get started</p>
            </div>
          ) : (
            pins.map(pin => (
              <div 
                key={pin.id} 
                className="pin-card"
                onClick={() => setSelectedPin(pin)}
              >
                {pin.images.length > 0 && (
                  <img src={pin.images[0]} alt="Pin" className="pin-card-image" />
                )}
                <div className="pin-card-content">
                  <p className="pin-card-caption">{pin.caption}</p>
                  <div className="pin-card-meta">
                    {pin.visibility === 'friends' ? (
                      <span className="visibility-badge friends">
                        <Users size={14} /> Friends
                      </span>
                    ) : (
                      <span className="visibility-badge berkeley">
                        <Globe size={14} /> Berkeley
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="map-container">
        <Map
          {...viewState}
          onMove={evt => setViewState(evt.viewState)}
          onClick={handleMapClick}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={MAPBOX_TOKEN}
          style={{ width: '100%', height: '100%' }}
        >
          {pins.map(pin => (
            <Marker
              key={pin.id}
              latitude={pin.latitude}
              longitude={pin.longitude}
              onClick={(e) => {
                e.originalEvent.stopPropagation()
                setSelectedPin(pin)
              }}
            >
              <div className="map-marker">
                <MapPin size={32} fill="#003262" color="#FDB515" />
              </div>
            </Marker>
          ))}

          {newPinLocation && (
            <Marker
              latitude={newPinLocation.latitude}
              longitude={newPinLocation.longitude}
            >
              <div className="map-marker new">
                <MapPin size={32} fill="#FDB515" color="#003262" />
              </div>
            </Marker>
          )}

          {selectedPin && (
            <Popup
              latitude={selectedPin.latitude}
              longitude={selectedPin.longitude}
              onClose={() => setSelectedPin(null)}
              closeButton={true}
              closeOnClick={false}
            >
              <div className="pin-popup">
                {selectedPin.images.length > 0 && (
                  <img src={selectedPin.images[0]} alt="Pin" className="popup-image" />
                )}
                <p className="popup-caption">{selectedPin.caption}</p>
                <div className="popup-meta">
                  <span className="popup-author">{selectedPin.author}</span>
                  {selectedPin.visibility === 'friends' ? (
                    <span className="visibility-badge friends">
                      <Users size={12} /> Friends
                    </span>
                  ) : (
                    <span className="visibility-badge berkeley">
                      <Globe size={12} /> Berkeley
                    </span>
                  )}
                </div>
              </div>
            </Popup>
          )}
        </Map>

        {isCreatingPin && (
          <div className="map-overlay">
            <div className="map-hint">
              <MapPin size={24} />
              <p>Click anywhere on the map to place your pin</p>
            </div>
          </div>
        )}
      </div>

      {showCreateModal && (
        <div className="modal-overlay" onClick={closeCreateModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create New Pin</h3>
              <button className="close-btn" onClick={closeCreateModal}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-content">
              <div className="form-group">
                <label>Caption</label>
                <textarea
                  placeholder="What's happening at this location?"
                  value={newPin.caption}
                  onChange={(e) => setNewPin({ ...newPin, caption: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label>Photos</label>
                <div className="image-upload-area">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                  <button 
                    className="upload-btn"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload size={20} />
                    Upload Photos
                  </button>
                  
                  {newPin.images.length > 0 && (
                    <div className="image-preview-grid">
                      {newPin.images.map((img, index) => (
                        <div key={index} className="image-preview">
                          <img src={img} alt={`Upload ${index + 1}`} />
                          <button 
                            className="remove-image-btn"
                            onClick={() => removeImage(index)}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Who can see this?</label>
                <div className="visibility-options">
                  <button
                    className={`visibility-option ${newPin.visibility === 'friends' ? 'active' : ''}`}
                    onClick={() => setNewPin({ ...newPin, visibility: 'friends' })}
                  >
                    <Users size={20} />
                    <div>
                      <div className="option-title">Friends Only</div>
                      <div className="option-desc">Only your friends can see this</div>
                    </div>
                  </button>
                  <button
                    className={`visibility-option ${newPin.visibility === 'berkeley' ? 'active' : ''}`}
                    onClick={() => setNewPin({ ...newPin, visibility: 'berkeley' })}
                  >
                    <Globe size={20} />
                    <div>
                      <div className="option-title">Berkeley Community</div>
                      <div className="option-desc">All Berkeley students can see this</div>
                    </div>
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Share with Circles (optional)</label>
                <div className="circles-options">
                  {['Study Group', 'Roommates', 'Club Members', 'Classmates'].map(circle => (
                    <label key={circle} className="circle-checkbox">
                      <input
                        type="checkbox"
                        checked={newPin.circles.includes(circle)}
                        onChange={() => toggleCircle(circle)}
                      />
                      <span>{circle}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={closeCreateModal}>
                Cancel
              </button>
              <button 
                className="btn-primary" 
                onClick={handleCreatePin}
                disabled={!newPin.caption}
              >
                Create Pin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Pins
