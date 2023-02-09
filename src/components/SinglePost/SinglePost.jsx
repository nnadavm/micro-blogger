import React from 'react';
import "./SinglePost.css"
import moment from 'moment';

function SinglePost({ post }) {
    const { content, userName, date } = post;

    return (
        <div className='single-post-container'>
            <div className='post-header'>
                <div>{userName}</div>
                <div>{moment(date).format("MMM Do h:mm a")}</div>
            </div>
            <p>{content}</p>
        </div>
    )
}

export default SinglePost