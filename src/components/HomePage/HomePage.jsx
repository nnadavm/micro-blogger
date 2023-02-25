import React, { useState, useEffect } from 'react';
import PostForm from '../PostForm/PostForm';
import PostList from '../PostList/PostList';
import NavBar from '../Navbar/Navbar';
import { suscribeToFirebase } from '../../utils/firebaselib';

function HomePage() {
    const [postsList, setPostsList] = useState([]);
    const [lastDocument, setLastDocument] = useState(null);

    useEffect(() => {
        suscribeToFirebase(setPostsList, setLastDocument);
    }, [])

    return (
        <>
            <NavBar />
                <div className='page-wrapper'>
                    <PostForm className='p-2' />
                    <PostList postsList={postsList} setPostsList={setPostsList} lastDocument={lastDocument} setLastDocument={setLastDocument} />

                </div>
        </>
    )
}

export default HomePage