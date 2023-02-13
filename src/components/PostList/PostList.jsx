import React, { useContext, useEffect } from 'react'
import SinglePost from '../SinglePost/SinglePost'
import PostsContext from '../../contexts/PostsContext';


function PostList() {
    const { postsList, setPostsList } = useContext(PostsContext)

    async function fetchFromServer() {
        const URL = 'https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet'

        try {
            const response = await fetch(URL);
            const data = await response.json();
            setPostsList(data.tweets);
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
            {postsList.length ? postsList.map((post, index) => {
                return (<SinglePost post={post} key={index} />)
            }) : ''}
        </div>
    )
}

export default PostList