import React from 'react';
import "./SinglePost.css";
import moment from 'moment';
import { Avatar } from '@mui/material';

function SinglePost({ post }) {
    const { content, userName, date, photoURL } = post;

    return (
        <div className='single-post-container'>
            <div className='post-header'>
                <div className='profile-container'>
                    <Avatar src={photoURL !== "" ? photoURL : './emptyAvatar.jpeg'} />
                    <div className='p-2'>{userName}</div>
                </div>
                <div>{moment(date).format("MMM Do h:mm a")}</div>
            </div>
            <p>{content}</p>
        </div>
    )
};

export default SinglePost;