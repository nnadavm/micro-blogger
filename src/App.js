import './App.css'
import PostForm from "./components/PostForm/PostForm";
import PostList from './components/PostList/PostList';
import PostsContext from './contexts/PostsContext';
import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';

function App() {
  const [postsList, setPostsList] = useState([]);
  const [username, setUsername] = useState('userName');
  const [isLoading, setIsLoading] = useState(true);

  async function fetchFromServer() {
    const URL = 'https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet'

    try {
      const response = await fetch(URL);
      const data = await response.json();
      console.log(data);
      setPostsList(data.tweets);
      setIsLoading(false);
    }
    catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchFromServer();
  }, [isLoading])

  return (
    <PostsContext.Provider className='App' value={{ postsList, setPostsList, username, setIsLoading, isLoading }}>
      <div className='wrapper'>

        <div className="App">
          <PostForm className='p-2' />
          {!isLoading ?
            <PostList /> :
            <div className='d-flex justify-content-center p-3'>
              <Spinner animation="border" variant="light" />
            </div>}
        </div>
      </div>
    </PostsContext.Provider>
  );
}

export default App;
