# Inquiries Feature Documentation

## Overview

The Inquiries feature is a sophisticated Q&A and discussion system designed for Berkeley students to ask questions, share knowledge, and engage in multi-threaded conversations.

## Key Features

### 1. **Question Posting**
- **One-sentence format**: Encourages clear, concise questions
- **Character limit**: 200 characters to keep questions focused
- **Required categories**: Every inquiry must have at least one category tag
- **Author identification**: Name-based posting (no authentication yet)

### 2. **Category System**

10 predefined categories tailored for Berkeley students:

| Category | Use Case |
|----------|----------|
| **Academic** | Classes, professors, study tips, assignments |
| **Housing** | Dorms, apartments, roommates, leases |
| **Social** | Events, clubs, making friends, activities |
| **Career** | Internships, jobs, networking, career advice |
| **Campus Life** | Campus resources, facilities, student life |
| **Study Groups** | Finding study partners, group formation |
| **Events** | Upcoming events, gatherings, activities |
| **Food & Dining** | Dining halls, restaurants, food recommendations |
| **Transportation** | BART, buses, parking, getting around |
| **General** | Everything else |

### 3. **Sidebar Filtering**

- **Visual category filters**: Click to filter by one or multiple categories
- **Live counts**: See how many inquiries exist in each category
- **Active state indicators**: Clear visual feedback for selected filters
- **Clear all button**: Quick reset of all filters
- **Statistics display**: 
  - Total inquiries count
  - Currently showing count

### 4. **Search Functionality**

- **Real-time search**: Filters as you type
- **Searches across**:
  - Question content
  - Author names
- **Clear button**: Quick search reset
- **Combined with filters**: Search works alongside category filters

### 5. **Multi-threaded Conversations**

- **Unlimited nesting**: Replies can have replies indefinitely
- **Visual hierarchy**: 
  - Top-level inquiries: Blue left border
  - Replies: Gold left border with indentation
  - Progressive indentation for nested replies
- **Show/hide threads**: Collapse long reply chains
- **Reply counts**: See how many responses each inquiry has
- **Chronological sorting**:
  - Inquiries: Newest first
  - Replies within threads: Oldest first (conversation flow)

### 6. **User Interface**

#### Layout
- **Two-column design**:
  - Left sidebar (280px): Filters and stats
  - Main content area: Inquiries and interactions
- **Sticky sidebar**: Stays visible while scrolling
- **Responsive**: Adapts to mobile and tablet screens

#### Visual Design
- **Berkeley colors**: Blue (#003262) and Gold (#FDB515)
- **Card-based layout**: Clean, modern cards for each inquiry
- **Hover effects**: Interactive feedback on all clickable elements
- **Smooth transitions**: Professional animations throughout

#### Interaction Patterns
- **Inline replies**: Reply forms appear directly below comments
- **Category badges**: Visual tags on each inquiry
- **Timestamps**: Relative time display (e.g., "2h ago", "Just now")
- **Empty states**: Helpful messages when no results found

### 7. **Real-time Updates**

- **Automatic refresh**: Comments reload after posting
- **Optimistic UI**: Immediate feedback on actions
- **Error handling**: Clear error messages if backend is offline
- **Loading states**: Visual feedback during data fetching

## User Workflows

### Posting a Question
1. Enter your name
2. Type your question (one sentence, max 200 chars)
3. Select at least one category
4. Click "Post Question"
5. Your inquiry appears at the top of the list

### Finding Relevant Inquiries
1. **Option A - Category filtering**:
   - Click category filters in sidebar
   - Select multiple categories if needed
   - View filtered results
2. **Option B - Search**:
   - Type keywords in search bar
   - Results filter in real-time
3. **Option C - Combine both**:
   - Use category filters + search together

### Engaging in Discussions
1. Find an inquiry you want to respond to
2. Click "Reply" button
3. Enter your name and response
4. Click "Submit Reply"
5. Your reply appears in the thread
6. Others can reply to your reply (nested conversation)

### Managing Long Threads
1. Click "Show/Hide X replies" to collapse/expand threads
2. Focus on specific conversations
3. Reduce visual clutter

## Technical Implementation

### Frontend
- **React Hooks**: useState, useEffect for state management
- **Real-time filtering**: Client-side filtering for instant results
- **Responsive grid**: CSS Grid for layout
- **Lucide icons**: Modern icon library

### Backend
- **Express.js**: RESTful API
- **SQLite**: Lightweight database
- **JSON storage**: Categories stored as JSON strings
- **Nested data structure**: Tree-based comment organization

### API Endpoints
- `GET /comments`: Fetch all inquiries with nested replies
- `POST /comments`: Create new inquiry or reply

## Future Enhancements

### Planned Features
- [ ] User authentication and profiles
- [ ] Upvote/downvote system
- [ ] Mark best answer
- [ ] User reputation points
- [ ] Follow inquiries for notifications
- [ ] Rich text editor with formatting
- [ ] Image attachments in replies
- [ ] @mentions for users
- [ ] Email notifications
- [ ] Moderation tools
- [ ] Report inappropriate content
- [ ] Pin important inquiries
- [ ] Archive old inquiries
- [ ] Export conversations
- [ ] Analytics dashboard

### Technical Improvements
- [ ] WebSocket for real-time updates
- [ ] Pagination for large datasets
- [ ] Infinite scroll
- [ ] Persistent database (file-based SQLite)
- [ ] Full-text search with ranking
- [ ] Rate limiting
- [ ] Input sanitization
- [ ] XSS protection
- [ ] CSRF tokens
- [ ] API authentication

## Best Practices for Users

### Asking Good Questions
✅ **Do:**
- Keep it to one clear sentence
- Choose relevant categories
- Be specific about your situation
- Use proper grammar and spelling

❌ **Don't:**
- Ask multiple questions in one post
- Use vague or unclear language
- Forget to add categories
- Post duplicate questions

### Providing Helpful Answers
✅ **Do:**
- Be respectful and constructive
- Share personal experiences
- Provide specific details
- Link to resources when relevant

❌ **Don't:**
- Be rude or dismissive
- Give incorrect information
- Go off-topic
- Spam or self-promote

## Troubleshooting

### "Unable to load inquiries"
**Cause**: Backend server not running  
**Solution**: Start the backend with `./start-backend.sh` or `cd inquiries/backend && npm start`

### Categories not saving
**Cause**: No categories selected  
**Solution**: Select at least one category before posting

### Search not working
**Cause**: JavaScript error or browser issue  
**Solution**: Check browser console, refresh page

### Replies not appearing
**Cause**: Backend database issue  
**Solution**: Restart backend server (in-memory DB resets)

## Performance Considerations

- **Client-side filtering**: Fast, no server requests
- **Optimized rendering**: React efficiently updates only changed components
- **Lazy loading**: Could be added for large datasets
- **Caching**: Browser caches static assets

## Accessibility

- Keyboard navigation support
- Semantic HTML structure
- ARIA labels on interactive elements
- High contrast colors (WCAG compliant)
- Responsive text sizing

## Security Notes

⚠️ **Current Limitations** (Development mode):
- No authentication
- No input sanitization
- No rate limiting
- In-memory database (data loss on restart)
- CORS open to all origins

🔒 **Production Requirements**:
- Add user authentication
- Sanitize all user inputs
- Implement rate limiting
- Use persistent database
- Restrict CORS to your domain
- Add HTTPS
- Implement content moderation

---

**Last Updated**: February 27, 2026  
**Version**: 1.0.0  
**Status**: Development / MVP
