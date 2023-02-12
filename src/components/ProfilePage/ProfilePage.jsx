import React, { useState } from 'react'
import "./ProfilePage.css"
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

function ProfilePage() {
    const [inputValue, setInputValue] = useState('username')

    return (
        <div>
            <h1>Profile</h1>
            <Form.Label htmlFor="userNameInput">User Name</Form.Label>
            <InputGroup className="mb-3">
                <Form.Control value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                    }}
                    className='input'
                    id="userNameInput" />
            </InputGroup>
            <Button
                variant="outline-primary"
                onClick={(e) => {
                    localStorage.setItem('username', JSON.stringify(inputValue))
                }}
            >Save</Button>
        </div>
    )
}

export default ProfilePage