import React, { useState } from 'react';
import { Post } from '../../redux/types';
import Comment from '../Comment/Comment';
import './PostItem.css';

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const defaultImage = 'https://picsum.photos/id/870/200/300?grayscale&blur=2';
  const formattedDate = new Date(post.created_utc * 1000).toLocaleDateString();
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => setShowComments((prev) => !prev);

  return (
    <div className="post-item">
      <img
        src={post.image || defaultImage}
        alt={post.title}
        className="post-image"
      />
      <div className="post-content">
        <h3 className="post-title">{post.title}</h3>
        <p className="post-author">Posted by {post.author} on {formattedDate}</p>
        <p className="post-subreddit">Subreddit: {post.subreddit}</p>
        <p className="post-comments">{post.num_comments} comments</p>
        <button onClick={toggleComments}>
          {showComments ? 'Hide Comments' : 'Show Comments'}
        </button>
        {showComments && <Comment postId={post.id} />}
      </div>
    </div>
  );
};

export default PostItem;
