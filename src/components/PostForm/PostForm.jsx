import React, { useState, useContext } from 'react'
import './PostForm.css'
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Button from 'react-bootstrap/Button';
import PostsContext from '../../contexts/PostsContext';
import { v4 as uuidv4 } from 'uuid';
import db from '../../firebaseconfig';
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'
import { colRef, colRefQuery } from '../../firebaseconfig';
import { AuthContext } from '../../contexts/AuthContext';



function PostForm() {
    const { currentUser } = useContext(AuthContext);
    const initialState = {
        content: '',
        userName: '',
        date: ''
    };
    const [singlePost, setSinglePost] = useState(initialState);
    const [serverError, setServerError] = useState(null);

    function handleOnChange(e, key) {
        setSinglePost(pre => {
            return {
                ...pre,
                [key]: e.target.value
            }
        })
    };

    function addPostToFirebase() {
        addDoc(colRef, {
            ...singlePost,
            id: uuidv4(),
            userName: currentUser.displayName,
            date: new Date().toISOString(),
            photoURL: currentUser.photoURL
        })
        .catch((e) => console.log(e))
    };

    function handleOnSave() {
        if (singlePost.content.length > 0) {
            addPostToFirebase();
        }
        setServerError(null);
        setSinglePost(initialState);
    };

    // function setErrorMessage() {
    //     let errorMessage;
    //     if (singlePost.content.length === 140) {
    //         errorMessage = <div className="error">A post cant be longer then 140 characters!</div>;
    //     } else if (serverError !== null && singlePost.content.length < 140) {
    //         errorMessage = <div className="error">Error from server: {serverError}</div>;
    //     } else {
    //         errorMessage = <div></div>;
    //     }
    //     return errorMessage
    // };

    return (
        <div className='formContainer'>
            <TextareaAutosize
                className='form'
                minRows={10}
                maxLength={140}
                placeholder={`Hello ${currentUser ? currentUser.displayName : ''}, What's on your mind?`}
                style={{ width: '60vw' }}
                value={singlePost.content}
                onChange={(e) => handleOnChange(e, "content")}
            />
            <div className='form-footer'>
                {/* {setErrorMessage()} */}
                <Button
                    className='btn'
                    variant="outline-primary"
                    onClick={handleOnSave}
                >Post</Button>
            </div>

        </div>
    )
}

export default PostForm