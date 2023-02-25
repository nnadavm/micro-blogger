import React, { useState, useContext } from 'react';
import './PostForm.css';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Button from 'react-bootstrap/Button';
import { v4 as uuidv4 } from 'uuid';
import { addDoc } from 'firebase/firestore';
import { colRef} from '../../utils/firebaselib';
import { AuthContext } from '../../contexts/AuthContext';

function PostForm() {
    const { currentUser } = useContext(AuthContext);
    const initialState = {content: ''};
    const [singlePost, setSinglePost] = useState(initialState);
    const [errorMessage, setErrorMessage] = useState(null);

    function handleOnChange(e, key) {
        setSinglePost(pre => {
            return {
                ...pre,
                [key]: e.target.value
            }
        })
    };

    function addPostToFirebase() {
        const postObj = {
            ...singlePost,
            uid: currentUser.uid,
            id: uuidv4(),
            userName: currentUser.displayName,
            date: new Date().toISOString(),
            photoURL: currentUser.photoURL
        };
        console.log('submitting post:' ,postObj );
        addDoc(colRef, postObj)
        .then(() => {
            console.log('post submit');
        })
        .catch((e) => {
            console.log(e);
            setErrorMessage(e);
        })
    };

    function handleSubmit() {
        setErrorMessage(null);
        if (singlePost.content.length > 0 && singlePost.content.length < 140 ) {
            addPostToFirebase();
            setSinglePost(initialState);
        } else if (singlePost.content.length === 0) {
            setErrorMessage('Post cant be empty');
        } else if (singlePost.content.length === 140) {
            setErrorMessage('A post cant be longer then 140 characters!');
        }
    };

    function onEnterPress(e) {
        if(e.keyCode == 13 && e.shiftKey == false) {
          e.preventDefault();
          handleSubmit();
        }
      };

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
                onKeyDown={onEnterPress}
            />
            <div className='form-footer'>
            {errorMessage ? <div className="error">{errorMessage}</div> : <div></div>}

                <Button
                    className='btn'
                    variant="outline-primary"
                    onClick={handleSubmit}
                >Post</Button>
            </div>

        </div>
    )
}

export default PostForm;