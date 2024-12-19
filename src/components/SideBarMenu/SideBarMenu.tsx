import React from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { setSelectedTopic } from '../../redux/postsSlice';
import './SideBarMenu.css';

const SideBarMenu: React.FC = () => {
  const selectedTopic = useSelector((state: RootState) => state.posts.selectedTopic);
  const dispatch = useAppDispatch();

  const subreddits = ['technology', 'programming', 'science', 'askreddit', 'music', 'books', 'food', 'travel', 'art', 'news'];

  const handleSelectTopic = (topic: string) => {
    console.log('Selected topic:', topic);
    dispatch(setSelectedTopic(topic));
  };

  return (
    <div className="sidebar" role="navigation">
      <h3>Subreddits</h3>
      <ul>
        {subreddits.map((subreddit) => (
          <li
            key={subreddit}
            className={selectedTopic === subreddit ? 'selected' : ''}
            onClick={() => handleSelectTopic(subreddit)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleSelectTopic(subreddit)}
            aria-selected={selectedTopic === subreddit}
          >
            {subreddit}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBarMenu;
