import React, { useState, useContext } from 'react'
import './PostForm.css'
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Button from 'react-bootstrap/Button';
import PostsContext from '../../contexts/PostsContext';
import { v4 as uuidv4 } from 'uuid';
import UsernameContext from '../../contexts/UsernameContext';

function PostForm() {
    const { postsList, setPostsList } = useContext(PostsContext);
    const { username } = useContext(UsernameContext)
    const initialState = {
        content: '',
        userName: username,
        date: ''
    }
    const [singlePost, setSinglePost] = useState(initialState)
    const [serverError, setServerError] = useState(null);

    function handleOnChange(e, key) {
        setSinglePost(pre => {
            return {
                ...pre,
                [key]: e.target.value
            }
        })
    }

    function handleOnSave() {
        if (singlePost.content.length > 0) {
            const newArray = [...postsList, { ...singlePost, id: uuidv4(), date: new Date().toISOString() }]
            newArray.sort((a, b) => (a.date > b.date) ? -1 : 1)
            setPostsList(newArray)
        }
        setServerError(null);
        saveToServer();
        setSinglePost(initialState)
    }

    async function saveToServer() {
        const URL = 'https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet';
        const options = {
            method: 'POST',
            body: JSON.stringify({
                content: singlePost.content,
                userName: singlePost.userName,
                date: new Date().toISOString()
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }

        try {
            const response = await fetch(URL, options);
            const data = await response.json();
            if (data.statusCode) setServerError(data.message);
        }
        catch (e) {
            console.log(e)
        }
    }

    function setErrorMessage() {
        let errorMessage;
        if (singlePost.content.length === 140) {
            errorMessage = <div className="error">A post cant be longer then 140 characters!</div>;
        } else if (serverError !== null && singlePost.content.length < 140) {
            errorMessage = <div className="error">Error from server: {serverError}</div>;
        } else {
            errorMessage = <div></div>;
        }
        return errorMessage
    }

    return (
        <div className='formContainer'>
            <TextareaAutosize
                className='form'
                minRows={10}
                maxLength={140}
                placeholder={`Hello ${username}, What's on your mind?`}
                style={{ width: '60vw' }}
                value={singlePost.content}
                onChange={(e) => handleOnChange(e, "content")}
            />
            <div className='form-footer'>
                {setErrorMessage()}
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