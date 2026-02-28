import React from 'react';
import Comment from './Comment';

function CommentList({ comments, refreshComments }) {
  return (
    <div>
      {comments.map(c => (
        <Comment key={c.id} comment={c} refreshComments={refreshComments} />
      ))}
    </div>
  );
}

export default CommentList;