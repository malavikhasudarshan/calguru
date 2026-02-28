import React, { useEffect, useState } from 'react';
import { getComments, postComment } from './api';
import CommentList from './CommentList';

function App() {
  const [comments, setComments] = useState([]);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const fetchComments = async () => {
    const data = await getComments();
    setComments(data);
  };

  const handlePost = async () => {
    if (!author || !content) return;
    await postComment({ author, content });
    setAuthor('');
    setContent('');
    fetchComments();
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Comment Threads</h2>
      <div>
        <input placeholder="Your name" value={author} onChange={e => setAuthor(e.target.value)} />
        <input placeholder="Write a comment..." value={content} onChange={e => setContent(e.target.value)} />
        <button onClick={handlePost}>Post Comment</button>
      </div>
      <CommentList comments={comments} refreshComments={fetchComments} />
    </div>
  );
}

export default App;