import React, { useContext, useState, useEffect } from 'react'
import "./ProfilePage.css"
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import UsernameContext from '../../contexts/UserCredContext';
import { firebaseStorage, auth } from '../../firebaseconfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import UserCredContext from '../../contexts/UserCredContext';
import { getAuth, updateProfile } from 'firebase/auth';
import { AuthContext } from '../../contexts/AuthContext';


function ProfilePage() {
    const { currentUser , setCurrentUser } = useContext(AuthContext);
    const [inputValue, setInputValue] = useState('');
    const [image, setImage] = useState(null);

    function handleImageChange(e) {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    function updateFirebaseUser(newDisplayName, newURL) {
        updateProfile(auth.currentUser, {
            displayName: newDisplayName, photoURL: newURL
        }).then(() => {
            const { displayName, photoURL } = auth.currentUser
            setCurrentUser({
                ...currentUser,
                displayName: displayName,
                photoURL: photoURL
            });

        }).catch((error) => {
            console.log(error);
        });
    }

    function handleSubmit() {
        const imageRef = ref(firebaseStorage, "UploadedProfileImage");
        uploadBytes(imageRef, image)
            .then(() => {
                getDownloadURL(imageRef)
                    .then((url) => {
                        updateFirebaseUser(inputValue, url);
                        console.log('user updated');
                    })
                    .catch((error) => {
                        console.log(error.message, "error getting the image url");
                    });
                setImage(null);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };


    return (
        <div className='wrapper'>
            <h1>Profile Settings</h1>
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
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Set Profile Avatar</Form.Label>
                <Form.Control type="file" onChange={handleImageChange} />
            </Form.Group>
            <Button
                variant="outline-primary"
                onClick={handleSubmit}
            >Save</Button>
        </div>
    )
}

export default ProfilePage