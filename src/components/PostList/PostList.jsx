import React, { useContext, useEffect, useState } from 'react'
import SinglePost from '../SinglePost/SinglePost'
import PostsContext from '../../contexts/PostsContext';
import Spinner from 'react-bootstrap/Spinner';


function PostList() {
    const { postsList, setPostsList } = useContext(PostsContext);
    const [isMounting, setIsMounting] = useState(true);

    async function fetchFromServer() {
        const URL = 'https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet'

        try {
            const response = await fetch(URL);
            const data = await response.json();
            setPostsList(data.tweets);
            setIsMounting(false)
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchFromServer();
        const interval = setInterval(() => {
            fetchFromServer()
        }, 5000);

        return () => clearInterval(interval);
    }, [])


    return (
        <div>
            {isMounting ? <div className='p-3 d-flex justify-content-center'><Spinner animation="border" /></div> : ''}
            {postsList.length && !isMounting ? postsList.map((post, index) => {
                return (<SinglePost post={post} key={index} />)
            }) : ''}
        </div>
    )
}

export default PostList
