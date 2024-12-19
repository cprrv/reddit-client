import React from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import SideBarMenu from './components/SideBarMenu/SideBarMenu';
import PostList from './components/PostList/PostList';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <header>
        <h1 aria-label="Application title">Reddit Lite</h1>
        <SearchBar aria-label="Search posts" />
      </header>

      <main className="content-container">
        <SideBarMenu aria-label="Sidebar menu for navigation" />
        <PostList aria-label="List of posts" />
      </main>

      <footer>
        <p aria-label="Footer text">Made with ❤️ by 🔷.</p>
      </footer>
    </div>
  );
};

export default App;
