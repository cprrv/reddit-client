import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchComments } from '../../redux/commentsSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import './Comment.css';

interface CommentsProps {
  postId: string;
}

const Comments: React.FC<CommentsProps> = ({ postId }) => {
  const dispatch = useAppDispatch();
  const { items: comments, status, error } = useSelector((state: RootState) => state.comments);

  useEffect(() => {
    if (postId) {
      dispatch(fetchComments(postId));
    }
  }, [dispatch, postId]);

  if (status === 'loading') return <p>Loading comments...</p>;
  if (error) return <p>Error loading comments: {error}</p>;

  return (
    <div className="comments">
      <h3 className="comments-title">Comments</h3>
      {comments.length === 0 ? (
        <p className="comments-empty">No comments available.</p>
      ) : (
        <ul className="comments-list">
          {comments.map((comment) => (
            <li key={comment.id} className="comment">
              <div className="comment-header">
                <span className="comment-author">{comment.author}</span>
                <span className="comment-score">Score: {comment.score}</span>
              </div>
              <p className="comment-body">{comment.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Comments;
