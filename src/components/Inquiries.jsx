import { useState, useEffect } from 'react'
import { MessageCircle, Send, Reply, X, Search, Tag, Filter, Plus } from 'lucide-react'
import './Inquiries.css'

const API_URL = 'http://localhost:5002'

// Predefined categories for Berkeley students
const CATEGORIES = [
  'Academic',
  'Housing',
  'Social',
  'Career',
  'Campus Life',
  'Study Groups',
  'Events',
  'Food & Dining',
  'Transportation',
  'General'
]

function Inquiries() {
  const [comments, setComments] = useState([])
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategories, setFilterCategories] = useState([])
  const [showFilters, setShowFilters] = useState(false)

  const fetchComments = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`${API_URL}/comments`)
      if (!response.ok) throw new Error('Failed to fetch comments')
      const data = await response.json()
      setComments(data)
    } catch (err) {
      setError('Unable to load inquiries. Make sure the backend server is running on port 5002.')
      console.error('Error fetching comments:', err)
    } finally {
      setLoading(false)
    }
  }

  const handlePost = async () => {
    if (!author.trim() || !content.trim()) {
      alert('Please enter your name and question')
      return
    }

    if (selectedCategories.length === 0) {
      alert('Please select at least one category')
      return
    }

    try {
      const response = await fetch(`${API_URL}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          author: author.trim(), 
          content: content.trim(),
          categories: selectedCategories
        })
      })
      
      if (!response.ok) throw new Error('Failed to post inquiry')
      
      setAuthor('')
      setContent('')
      setSelectedCategories([])
      fetchComments()
    } catch (err) {
      alert('Failed to post inquiry. Please try again.')
      console.error('Error posting comment:', err)
    }
  }

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const toggleFilterCategory = (category) => {
    setFilterCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  // Filter comments based on search and categories
  const filteredComments = comments.filter(comment => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.author.toLowerCase().includes(searchQuery.toLowerCase())
    
    // Category filter
    const matchesCategory = filterCategories.length === 0 || 
      (comment.categories && comment.categories.some(cat => filterCategories.includes(cat)))
    
    return matchesSearch && matchesCategory
  })

  // Count comments by category
  const categoryCounts = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = comments.filter(c => c.categories && c.categories.includes(cat)).length
    return acc
  }, {})

  useEffect(() => {
    fetchComments()
  }, [])

  return (
    <div className="inquiries-layout">
      {/* Sidebar */}
      <aside className="inquiries-sidebar">
        <div className="sidebar-section">
          <h3>
            <Filter size={18} />
            Filter by Category
          </h3>
          <div className="category-filters">
            {CATEGORIES.map(category => (
              <button
                key={category}
                className={`category-filter ${filterCategories.includes(category) ? 'active' : ''}`}
                onClick={() => toggleFilterCategory(category)}
              >
                <Tag size={14} />
                {category}
                <span className="category-count">{categoryCounts[category]}</span>
              </button>
            ))}
          </div>
          {filterCategories.length > 0 && (
            <button 
              className="clear-filters"
              onClick={() => setFilterCategories([])}
            >
              Clear Filters
            </button>
          )}
        </div>

        <div className="sidebar-stats">
          <div className="stat">
            <span className="stat-number">{comments.length}</span>
            <span className="stat-label">Total Inquiries</span>
          </div>
          <div className="stat">
            <span className="stat-number">{filteredComments.length}</span>
            <span className="stat-label">Showing</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="inquiries-main">
        <div className="inquiries-header">
          <div className="header-content">
            <MessageCircle size={32} />
            <div>
              <h2>Community Inquiries</h2>
              <p>Ask questions and connect with Berkeley students</p>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="search-bar">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search inquiries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="clear-search">
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* New Inquiry Form */}
        <div className="new-inquiry-section">
          <h3>Ask a Question</h3>
          <p className="form-hint">Post a one-sentence question that people can respond to</p>
          
          <div className="inquiry-form">
            <input
              type="text"
              placeholder="Your name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="inquiry-input"
            />
            
            <textarea
              placeholder="What's your question? (Keep it to one sentence for clarity)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="inquiry-textarea"
              rows="2"
              maxLength="200"
            />
            
            <div className="category-selection">
              <label>
                <Tag size={16} />
                Select Categories (at least one):
              </label>
              <div className="category-tags">
                {CATEGORIES.map(category => (
                  <button
                    key={category}
                    className={`category-tag ${selectedCategories.includes(category) ? 'selected' : ''}`}
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            <button onClick={handlePost} className="post-button">
              <Send size={18} />
              Post Question
            </button>
          </div>
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={fetchComments} className="retry-button">
              Retry
            </button>
          </div>
        )}

        {loading && <div className="loading">Loading inquiries...</div>}

        {/* Results Info */}
        {!loading && !error && (
          <div className="results-info">
            {searchQuery || filterCategories.length > 0 ? (
              <p>
                Showing {filteredComments.length} of {comments.length} inquiries
                {searchQuery && ` matching "${searchQuery}"`}
                {filterCategories.length > 0 && ` in ${filterCategories.join(', ')}`}
              </p>
            ) : (
              <p>Showing all {comments.length} inquiries</p>
            )}
          </div>
        )}

        {/* Comments List */}
        <div className="inquiries-list">
          {filteredComments.length === 0 && !loading && !error && (
            <div className="empty-state">
              <MessageCircle size={48} />
              <p>
                {searchQuery || filterCategories.length > 0 
                  ? 'No inquiries match your filters. Try adjusting your search or categories.'
                  : 'No inquiries yet. Be the first to ask a question!'}
              </p>
            </div>
          )}
          {filteredComments.map((comment) => (
            <Comment key={comment.id} comment={comment} refreshComments={fetchComments} />
          ))}
        </div>
      </div>
    </div>
  )
}

function Comment({ comment, refreshComments, depth = 0 }) {
  const [replying, setReplying] = useState(false)
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const [showReplies, setShowReplies] = useState(true)

  const handleReply = async () => {
    if (!author.trim() || !content.trim()) {
      alert('Please enter both name and reply')
      return
    }

    try {
      const response = await fetch(`${API_URL}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parent_id: comment.id,
          author: author.trim(),
          content: content.trim()
        })
      })

      if (!response.ok) throw new Error('Failed to post reply')

      setAuthor('')
      setContent('')
      setReplying(false)
      refreshComments()
    } catch (err) {
      alert('Failed to post reply. Please try again.')
      console.error('Error posting reply:', err)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  const replyCount = comment.replies ? comment.replies.length : 0
  const isTopLevel = depth === 0

  return (
    <div className={`comment ${isTopLevel ? 'top-level' : 'comment-reply'}`} style={{ marginLeft: depth * 20 }}>
      <div className="comment-content">
        <div className="comment-header">
          <div className="comment-meta">
            <span className="comment-author">{comment.author}</span>
            <span className="comment-date">{formatDate(comment.created_at)}</span>
          </div>
          {isTopLevel && comment.categories && comment.categories.length > 0 && (
            <div className="comment-categories">
              {comment.categories.map(cat => (
                <span key={cat} className="comment-category">
                  <Tag size={12} />
                  {cat}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <p className="comment-text">{comment.content}</p>
        
        <div className="comment-actions">
          <button onClick={() => setReplying(!replying)} className="reply-button">
            {replying ? <X size={16} /> : <Reply size={16} />}
            {replying ? 'Cancel' : 'Reply'}
          </button>
          
          {replyCount > 0 && (
            <button 
              onClick={() => setShowReplies(!showReplies)} 
              className="toggle-replies"
            >
              {showReplies ? 'Hide' : 'Show'} {replyCount} {replyCount === 1 ? 'reply' : 'replies'}
            </button>
          )}
        </div>

        {replying && (
          <div className="reply-form">
            <input
              type="text"
              placeholder="Your name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="reply-input"
            />
            <textarea
              placeholder="Write your reply..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="reply-textarea"
              rows="2"
            />
            <button onClick={handleReply} className="submit-reply-button">
              <Send size={16} />
              Submit Reply
            </button>
          </div>
        )}
      </div>

      {comment.replies && comment.replies.length > 0 && showReplies && (
        <div className="replies">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              refreshComments={refreshComments}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Inquiries
