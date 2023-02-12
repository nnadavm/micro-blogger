import React, { useState, useEffect, useContext } from 'react';
import PostForm from '../PostForm/PostForm';
import PostList from '../PostList/PostList';
import PostsContext from '../../contexts/PostsContext';
import Spinner from 'react-bootstrap/Spinner';
import UsernameContext from '../../contexts/UsernameContext';

function HomePage() {
    const { username , setUsername } = useContext(UsernameContext)
    const [postsList, setPostsList] = useState([]);
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
        <PostsContext.Provider value={{ postsList, setPostsList, username, setUsername, setIsLoading, isLoading }}>
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

    )
}

export default HomePage