import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { fetchPosts } from '../../redux/postsSlice';
import PostItem from '../PostItem/PostItem';
import './PostList.css';

const PostList: React.FC = () => {
  const dispatch = useAppDispatch();
  const posts = useSelector((state: RootState) => state.posts.items);
  console.log('Posts in PostList:', posts);
  const postsStatus = useSelector((state: RootState) => state.posts.status);
  const postsError = useSelector((state: RootState) => state.posts.error);
  const selectedTopic = useSelector((state: RootState) => state.posts.selectedTopic);

  useEffect(() => {
    if (selectedTopic) {
      dispatch(fetchPosts({ searchTerm: '', selectedTopic }));
    } else {
      dispatch(fetchPosts({ searchTerm: '', selectedTopic: null }));
    }
  }, [dispatch, selectedTopic]);

  if (postsStatus === 'loading') {
    return <div>Loading posts...</div>;
  }

  if (postsStatus === 'failed') {
    return <div>Error: {postsError}</div>;
  }

  if (!posts.length) {
    return <div>No posts found</div>;
  }

  return (
    <div className="post-list">
      {posts.map((post) => <PostItem key={post.id} post={post} />)}
    </div>
  );
};

export default PostList;
