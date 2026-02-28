import React, { useState } from 'react';
import { postComment } from './api';
import CommentList from './CommentList';

function Comment({ comment, refreshComments }) {
  const [replying, setReplying] = useState(false);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleReply = async () => {
    if (!author || !content) return;
    await postComment({ parent_id: comment.id, author, content });
    setAuthor('');
    setContent('');
    setReplying(false);
    refreshComments();
  };

  return (
    <div style={{ marginLeft: comment.parent_id ? 20 : 0, borderLeft: comment.parent_id ? '1px solid #ccc' : 'none', paddingLeft: 10, marginTop: 10 }}>
      <b>{comment.author}</b>: {comment.content}
      <div>
        <button onClick={() => setReplying(!replying)} style={{ marginTop: 5 }}>
          {replying ? 'Cancel' : 'Reply'}
        </button>
        {replying && (
          <div style={{ marginTop: 5 }}>
            <input placeholder="Your name" value={author} onChange={e => setAuthor(e.target.value)} />
            <input placeholder="Your reply" value={content} onChange={e => setContent(e.target.value)} />
            <button onClick={handleReply}>Submit</button>
          </div>
        )}
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <CommentList comments={comment.replies} refreshComments={refreshComments} />
      )}
    </div>
  );
}

export default Comment;