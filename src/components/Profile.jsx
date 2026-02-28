import { useState } from 'react'
import { User, MapPin, Calendar, Users, Heart, MessageCircle, Settings, Edit, Mail, Phone, Book } from 'lucide-react'
import './Profile.css'

function Profile() {
  const [activeTab, setActiveTab] = useState('about')

  // Mock user data
  const userData = {
    name: 'Alex Morgan',
    username: '@alexmorgan',
    major: 'Computer Science',
    year: 'Junior',
    email: 'alex.morgan@berkeley.edu',
    phone: '(510) 555-0123',
    location: 'Berkeley, CA',
    joinDate: 'September 2023',
    bio: 'CS major passionate about AI and machine learning. Love exploring Berkeley cafes and hiking in the East Bay. Always down for study sessions!',
    stats: {
      posts: 47,
      friends: 234,
      circles: 8
    },
    circles: [
      'CS 61A Study Group',
      'Hiking Club',
      'Cafe Hoppers',
      'Roommates',
      'Data Science Club',
      'Intramural Soccer',
      'Research Team',
      'Class of 2025'
    ],
    recentPosts: [
      { id: 1, content: 'Found an amazing study spot at Moffitt!', likes: 24, comments: 5 },
      { id: 2, content: 'Anyone want to grab boba after class?', likes: 18, comments: 12 },
      { id: 3, content: 'Just finished my CS project! Time to celebrate 🎉', likes: 45, comments: 8 }
    ]
  }

  return (
    <div className="profile-layout">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-cover"></div>
        <div className="profile-info-section">
          <div className="profile-avatar-container">
            <div className="profile-avatar">
              <User size={48} />
            </div>
            <button className="edit-profile-btn">
              <Edit size={16} />
              Edit Profile
            </button>
          </div>
          
          <div className="profile-details">
            <h1 className="profile-name">{userData.name}</h1>
            <p className="profile-username">{userData.username}</p>
            <p className="profile-bio">{userData.bio}</p>
            
            <div className="profile-meta">
              <div className="meta-item">
                <Book size={16} />
                <span>{userData.major}</span>
              </div>
              <div className="meta-item">
                <Calendar size={16} />
                <span>{userData.year}</span>
              </div>
              <div className="meta-item">
                <MapPin size={16} />
                <span>{userData.location}</span>
              </div>
              <div className="meta-item">
                <Calendar size={16} />
                <span>Joined {userData.joinDate}</span>
              </div>
            </div>

            <div className="profile-stats">
              <div className="stat-box">
                <div className="stat-number">{userData.stats.posts}</div>
                <div className="stat-label">Posts</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">{userData.stats.friends}</div>
                <div className="stat-label">Friends</div>
              </div>
              <div className="stat-box">
                <div className="stat-number">{userData.stats.circles}</div>
                <div className="stat-label">Circles</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="profile-content">
        {/* Tabs */}
        <div className="profile-tabs">
          <button 
            className={`tab-button ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            About
          </button>
          <button 
            className={`tab-button ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            Posts
          </button>
          <button 
            className={`tab-button ${activeTab === 'circles' ? 'active' : ''}`}
            onClick={() => setActiveTab('circles')}
          >
            Circles
          </button>
          <button 
            className={`tab-button ${activeTab === 'friends' ? 'active' : ''}`}
            onClick={() => setActiveTab('friends')}
          >
            Friends
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'about' && (
            <div className="about-section">
              <div className="info-card">
                <h3>Contact Information</h3>
                <div className="info-list">
                  <div className="info-item">
                    <Mail size={18} />
                    <div>
                      <div className="info-label">Email</div>
                      <div className="info-value">{userData.email}</div>
                    </div>
                  </div>
                  <div className="info-item">
                    <Phone size={18} />
                    <div>
                      <div className="info-label">Phone</div>
                      <div className="info-value">{userData.phone}</div>
                    </div>
                  </div>
                  <div className="info-item">
                    <MapPin size={18} />
                    <div>
                      <div className="info-label">Location</div>
                      <div className="info-value">{userData.location}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <h3>Academic Information</h3>
                <div className="info-list">
                  <div className="info-item">
                    <Book size={18} />
                    <div>
                      <div className="info-label">Major</div>
                      <div className="info-value">{userData.major}</div>
                    </div>
                  </div>
                  <div className="info-item">
                    <Calendar size={18} />
                    <div>
                      <div className="info-label">Year</div>
                      <div className="info-value">{userData.year}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'posts' && (
            <div className="posts-section">
              {userData.recentPosts.map(post => (
                <div key={post.id} className="post-item">
                  <p className="post-content">{post.content}</p>
                  <div className="post-engagement">
                    <span>
                      <Heart size={14} />
                      {post.likes}
                    </span>
                    <span>
                      <MessageCircle size={14} />
                      {post.comments}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'circles' && (
            <div className="circles-section">
              <div className="circles-grid">
                {userData.circles.map((circle, index) => (
                  <div key={index} className="circle-card">
                    <Users size={24} />
                    <span>{circle}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'friends' && (
            <div className="friends-section">
              <div className="friends-grid">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="friend-card">
                    <div className="friend-avatar">
                      <User size={24} />
                    </div>
                    <div className="friend-name">Friend {i + 1}</div>
                    <div className="friend-mutual">8 mutual friends</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Coming Soon Notice */}
        <div className="coming-soon-notice">
          <h3>🚧 Profile Feature in Development</h3>
          <p>
            Full profile functionality is coming soon! You'll be able to:
          </p>
          <ul>
            <li>Customize your profile with photos and themes</li>
            <li>Manage your friend list and circles</li>
            <li>View your post history and analytics</li>
            <li>Update privacy settings and preferences</li>
            <li>Connect with other Berkeley students</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Profile
