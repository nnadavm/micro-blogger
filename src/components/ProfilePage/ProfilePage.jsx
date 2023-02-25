import React, { useContext, useState, useRef } from 'react';
import "./ProfilePage.css";
import { Button, InputGroup, Form, Alert } from 'react-bootstrap';
import { firebaseStorage, updateDocuments, updateFirebaseUser } from '../../utils/firebaselib';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { AuthContext } from '../../contexts/AuthContext';
import NavBar from '../Navbar/Navbar';
import { Avatar } from '@mui/material';

function ProfilePage() {
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const [inputValue, setInputValue] = useState('');
    const [image, setImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const fileInputRef = useRef(null);

    function handleImageChange(e) {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    function handleSubmitDisplayName() {
        setErrorMessage(null);
        if (inputValue.length === 0) {
            setErrorMessage('Display name cannot be empty!');
            return;
        }
        updateFirebaseUser('displayName', inputValue, currentUser, setCurrentUser);
        updateDocuments(currentUser.uid, { userName: inputValue });
        setInputValue('');
    };

    function handleSubmitFile(e) {
        fileInputRef.current.value = null;
        setErrorMessage(null);
        const imageRef = ref(firebaseStorage, "UploadedProfileImage");
        uploadBytes(imageRef, image)
            .then(() => {
                getDownloadURL(imageRef)
                    .then((url) => {
                        updateFirebaseUser('photoURL', url, currentUser, setCurrentUser);
                        console.log('user updated');
                        updateDocuments(currentUser.uid, { photoURL: url });
                    })
            })
            .catch((error) => {
                console.log(error.message);
                setErrorMessage(error.message);
            });
        setImage(null);
    };

    return (
        <>
            <NavBar />
            <div className='wrapper page-wrapper d-flex flex-column align-items-center'>
                <h1>{currentUser ? currentUser.displayName : ""}</h1>
                <div className='p-3'>
                    <Avatar src={currentUser ? currentUser.photoURL : './emptyAvatar.jpeg'} sx={{ width: 200, height: 200 }} />
                </div>
                <div className='form-container'>
                    <Form.Label htmlFor="userNameInput">User Display Name</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control
                            value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.target.value);
                            }}
                            className='input'
                            id="userNameInput" />
                    </InputGroup>
                    <div className='d-flex justify-content-center'>
                        <Button
                            className='mb-3'
                            variant="outline-light"
                            onClick={handleSubmitDisplayName}
                        >Save</Button>
                    </div>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Set Profile Avatar</Form.Label>
                        <Form.Control ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png,.webp,.avif" onChange={handleImageChange}/>
                    </Form.Group>

                </div>
                <div>
                    <Button
                        variant="outline-light"
                        onClick={handleSubmitFile}
                    >Save</Button>
                </div>
                {errorMessage ? <Alert variant='danger'>{errorMessage}</Alert> : ''}
            </div>
        </>
    )
}

export default ProfilePage;