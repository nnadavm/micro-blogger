import React, { useState, useEffect, useContext } from 'react';
import PostForm from '../PostForm/PostForm';
import PostList from '../PostList/PostList';
import PostsContext from '../../contexts/PostsContext';
import NavBar from '../Navbar/Navbar';
import { AuthContext } from '../../contexts/AuthContext';

function HomePage() {
    const [postsList, setPostsList] = useState([]);
    const { currentUser } = useContext(AuthContext)

    return (
        <>
        
            <NavBar />
            <div className='wrapper'>
           
                <div className="App">
                    <PostForm className='p-2' />
                    <PostList postsList={postsList} setPostsList={setPostsList} />
                </div>
                
            </div>
        </>

    )
}

export default HomePage