import React, { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { addPost, removePost } from './redux/postsSlice';

function App() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const posts = useAppSelector((state) => state.posts.posts); // Récupérer les posts depuis Redux
  const dispatch = useAppDispatch(); // Dispatcher les actions Redux

  // Ajouter un post
  const handleAddPost = () => {
    if (title && content) {
      const newPost = {
        id: Math.random().toString(), // Génère un id unique
        title,
        content,
      };
      dispatch(addPost(newPost));
      setTitle(''); // Reset des champs
      setContent('');
    }
  };

  // Supprimer un post
  const handleRemovePost = (id: string) => {
    dispatch(removePost(id));
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Redux</h1>

      {/* Formulaire pour ajouter un post */}
      <div className="card">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Post content"
        />
        <button onClick={handleAddPost}>Add Post</button>
      </div>

      {/* Liste des posts */}
      <div className="post-list">
        <h2>Posts:</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <button onClick={() => handleRemovePost(post.id)}>
                Remove Post
              </button>
            </li>
          ))}
        </ul>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
