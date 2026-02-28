import { useState } from 'react'
import { Heart, MessageCircle, Share2, Bookmark, MapPin, Clock, Users } from 'lucide-react'
import './Feed.css'

// Mock data for demonstration
const MOCK_POSTS = [
  {
    id: 1,
    author: 'Sarah Chen',
    time: '2h ago',
    location: 'Moffitt Library',
    content: 'Found the perfect study spot on the 4th floor! Great views and super quiet. Highly recommend for finals week prep.',
    image: null,
    likes: 24,
    comments: 5,
    category: 'Academic'
  },
  {
    id: 2,
    author: 'Marcus Johnson',
    time: '4h ago',
    location: 'Sather Gate',
    content: 'Free boba at Sproul Plaza right now! First 50 students. Hurry!',
    image: null,
    likes: 89,
    comments: 12,
    category: 'Events'
  },
  {
    id: 3,
    author: 'Emma Rodriguez',
    time: '6h ago',
    location: 'Telegraph Ave',
    content: 'Just tried the new ramen place on Telegraph. 10/10 would recommend. Perfect for a study break!',
    image: null,
    likes: 45,
    comments: 8,
    category: 'Food'
  },
  {
    id: 4,
    author: 'Alex Kim',
    time: '8h ago',
    location: 'RSF',
    content: 'Looking for a workout buddy for morning gym sessions. Anyone interested? Trying to build a consistent routine this semester.',
    image: null,
    likes: 31,
    comments: 15,
    category: 'Social'
  },
  {
    id: 5,
    author: 'Jordan Lee',
    time: '10h ago',
    location: 'Doe Library',
    content: 'PSA: The main stacks are now open 24/7 for finals! Stock up on snacks and settle in.',
    image: null,
    likes: 67,
    comments: 9,
    category: 'Campus Life'
  }
]

const CATEGORIES = ['All', 'Academic', 'Social', 'Events', 'Food', 'Campus Life', 'Housing']

function Feed() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [likedPosts, setLikedPosts] = useState(new Set())
  const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set())

  const filteredPosts = selectedCategory === 'All' 
    ? MOCK_POSTS 
    : MOCK_POSTS.filter(post => post.category === selectedCategory)

  const toggleLike = (postId) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  const toggleBookmark = (postId) => {
    setBookmarkedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  return (
    <div className="feed-layout">
      {/* Sidebar */}
      <aside className="feed-sidebar">
        <div className="sidebar-section">
          <h3>Filter by Category</h3>
          <div className="category-filters">
            {CATEGORIES.map(category => (
              <button
                key={category}
                className={`category-filter ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="sidebar-section">
          <h3>Quick Stats</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <Users size={20} />
              <div>
                <div className="stat-number">2.4K</div>
                <div className="stat-label">Active Users</div>
              </div>
            </div>
            <div className="stat-item">
              <MessageCircle size={20} />
              <div>
                <div className="stat-number">156</div>
                <div className="stat-label">Posts Today</div>
              </div>
            </div>
          </div>
        </div>

        <div className="sidebar-section">
          <h3>Trending Topics</h3>
          <div className="trending-list">
            <div className="trending-item">#FinalsSeason</div>
            <div className="trending-item">#StudySpots</div>
            <div className="trending-item">#BerkeleyEats</div>
            <div className="trending-item">#CampusEvents</div>
          </div>
        </div>
      </aside>

      {/* Main Feed */}
      <div className="feed-main">
        <div className="feed-header">
          <h2>Community Feed</h2>
          <p>See what's happening around Berkeley campus</p>
        </div>

        {/* New Post Prompt */}
        <div className="new-post-prompt">
          <div className="prompt-avatar">
            <Users size={24} />
          </div>
          <div className="prompt-input">
            <input 
              type="text" 
              placeholder="Share something with the Berkeley community..."
              readOnly
            />
          </div>
        </div>

        {/* Posts Feed */}
        <div className="posts-container">
          {filteredPosts.length === 0 ? (
            <div className="empty-state">
              <MessageCircle size={48} />
              <p>No posts in this category yet.</p>
            </div>
          ) : (
            filteredPosts.map(post => (
              <article key={post.id} className="post-card">
                <div className="post-header">
                  <div className="post-author-info">
                    <div className="author-avatar">
                      {post.author[0]}
                    </div>
                    <div>
                      <div className="author-name">{post.author}</div>
                      <div className="post-meta">
                        <Clock size={12} />
                        {post.time}
                        {post.location && (
                          <>
                            <span className="meta-separator">•</span>
                            <MapPin size={12} />
                            {post.location}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="post-category">{post.category}</span>
                </div>

                <div className="post-content">
                  <p>{post.content}</p>
                </div>

                <div className="post-actions">
                  <button 
                    className={`action-button ${likedPosts.has(post.id) ? 'active' : ''}`}
                    onClick={() => toggleLike(post.id)}
                  >
                    <Heart size={18} fill={likedPosts.has(post.id) ? 'currentColor' : 'none'} />
                    <span>{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                  </button>
                  <button className="action-button">
                    <MessageCircle size={18} />
                    <span>{post.comments}</span>
                  </button>
                  <button className="action-button">
                    <Share2 size={18} />
                    <span>Share</span>
                  </button>
                  <button 
                    className={`action-button bookmark ${bookmarkedPosts.has(post.id) ? 'active' : ''}`}
                    onClick={() => toggleBookmark(post.id)}
                  >
                    <Bookmark size={18} fill={bookmarkedPosts.has(post.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
              </article>
            ))
          )}
        </div>

        {/* Coming Soon Notice */}
        <div className="coming-soon-notice">
          <h3>🚧 Feed Feature in Development</h3>
          <p>
            The full social feed is coming soon! You'll be able to:
          </p>
          <ul>
            <li>Create posts with photos and location tags</li>
            <li>Comment and engage with other students</li>
            <li>Follow friends and join circles</li>
            <li>Get real-time updates on campus events</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Feed
