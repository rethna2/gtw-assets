import React from 'react';
import Comment from './Comment';

const CommentsList = ({ comments, userId }) => (
  <React.Fragment>
    {comments.map((comment, i) => (
      <Comment key={i} comment={comment} userId={userId} />
    ))}
  </React.Fragment>
);

export default CommentsList;
