import React, { useState, useContext } from 'react'
import './PostForm.css'
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Button from 'react-bootstrap/Button';
import { v4 as uuidv4 } from 'uuid';
import PostsContext from '../../contexts/PostsContext';
import savePostsToLocalStorage from '../../utils/savetolocalstorage';

function PostForm() {
    const initialState = {
        content: '',
        userName: 'Nadav',
        date: ''
    }

    const { postsList, setPostsList } = useContext(PostsContext)
    const [singlePost, setSinglePost] = useState(initialState)

    function handleOnChange(e, key) {
        setSinglePost(pre => {
            return {
                ...pre,
                [key]: e.target.value
            }
        })
    }

    const handleOnSave = () => {
        const newArray = [...postsList, { ...singlePost, id: uuidv4(), date: Date.now() }]
        newArray.sort((a, b) => b.date - a.date)
        setPostsList(newArray)
        savePostsToLocalStorage(newArray)
        setSinglePost(initialState)
    }


    return (
        <div className='formContainer'>
            <TextareaAutosize
                className='form'
                minRows={10}
                maxLength={140}
                placeholder="What's on your mind?"
                style={{ width: '60vw' }}
                value={singlePost.content}
                onChange={(e) => handleOnChange(e, "content")}
            />
            <div className='form-footer'>
                <div className="error">
                    {singlePost.content.length === 140 ? 'A post cant be longer then 140 characters!' : ''}
                </div>
                <Button className='btn'
                    variant="outline-primary"
                    onClick={handleOnSave}
                >Post</Button>
            </div>

        </div>
    )
}

export default PostForm