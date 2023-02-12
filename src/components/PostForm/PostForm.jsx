import React, { useState, useContext } from 'react'
import './PostForm.css'
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Button from 'react-bootstrap/Button';
import PostsContext from '../../contexts/PostsContext';

function PostForm() {
    const { username, setIsLoading, isLoading } = useContext(PostsContext);
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
            console.log(data);
            if (data.statusCode) setServerError(data.message);
            setIsLoading(true);
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
                    disabled={isLoading}
                    onClick={handleOnSave}
                >Post</Button>
            </div>

        </div>
    )
}

export default PostForm