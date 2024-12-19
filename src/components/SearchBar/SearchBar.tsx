import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { setSearchTerm, fetchPosts } from '../../redux/postsSlice';
import './SearchBar.css';

const SearchBar: React.FC = () => {
  const [searchTermLocal, setSearchTermLocal] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const dispatch = useAppDispatch();

  const postsError = useSelector((state: RootState) => state.posts.error);

  let debounceTimeout: NodeJS.Timeout;

  const onSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTermLocal(newSearchTerm);
    setStatusMessage('');
  };

  const onSearchTermSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchTermTrimmed = searchTermLocal.trim();

    if (searchTermTrimmed === '') {
      setStatusMessage('Please enter a search term.');
      return;
    }

    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      dispatch(setSearchTerm(searchTermTrimmed));
      dispatch(fetchPosts({ searchTerm: searchTermTrimmed, selectedTopic: null }));
      setStatusMessage('');
    }, 500);
  };

  return (
    <form className="search-bar" onSubmit={onSearchTermSubmit}>
      <input
        id="search-input"
        type="text"
        value={searchTermLocal}
        onChange={onSearchTermChange}
        placeholder="Search posts..."
        aria-label="Search posts"
        className={searchTermLocal.trim() === '' ? 'invalid' : ''}
      />
      <button
        type="submit"
        aria-label="Search"
        disabled={searchTermLocal.trim() === ''}
        className={searchTermLocal.trim() === '' ? 'disabled' : ''}
      >
        Search
      </button>
      {statusMessage && <p role="status" className="status-message">{statusMessage}</p>}
      {postsError && <p role="alert" className="error-message">{postsError}</p>}
    </form>
  );
};

export default SearchBar;
