import React, { useState  } from 'react';
import PostForm from '../PostForm/PostForm';
import PostList from '../PostList/PostList';
import PostsContext from '../../contexts/PostsContext';

function HomePage() {
    const [postsList, setPostsList] = useState([]);

    return (
        <PostsContext.Provider value={{ postsList, setPostsList }}>
            <div className='wrapper'>
                <div className="App">
                    <PostForm className='p-2' />
                    <PostList/>
                </div>
            </div>
        </PostsContext.Provider>

    )
}

export default HomePage