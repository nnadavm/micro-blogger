import './App.css'
import PostForm from "./components/PostForm/PostForm";
import PostList from './components/PostList/PostList';
import PostsContext from './contexts/PostsContext';
import React, { useState, useEffect } from 'react';
import localforage from 'localforage';

function App() {
  const [postsList, setPostsList] = useState([])

  useEffect(() => {
    localforage.getItem("postsList").then(value => {
      if (value) setPostsList(value)
    }).catch(err => console.error(err))
  }, [])

  return (
    <PostsContext.Provider className='App' value={{ postsList, setPostsList }}>
      <div className="App">
        <PostForm className='p-2' />
        <PostList />
      </div>
    </PostsContext.Provider>
  );
}

export default App;
