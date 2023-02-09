import React, { useContext } from 'react'
import SinglePost from '../SinglePost/SinglePost'
import PostsContext from '../../contexts/PostsContext';

function PostList() {
    const { postsList, setPostsList } = useContext(PostsContext)

    return (
        <div>
            {postsList.length ? postsList.map((post, index) => {
                return (
                    <SinglePost post={post} key={index} />
                )
            }) : ''}
        </div>
    )
}

export default PostList