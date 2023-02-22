import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { auth } from '../../firebaseconfig';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { Avatar } from '@mui/material';
import { AuthContext } from '../../contexts/AuthContext';
import { Link, useNavigate } from "react-router-dom";




function NavBar() {
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    let photoURL;
    currentUser ? { photoURL } = currentUser : photoURL = '';
    const pathname = window.location.pathname;
    const navigate = useNavigate();


    function logout() {
        signOut(auth)
            .then(() => {
                setCurrentUser(null);
                navigate("/login");
            })
            .catch(err => {
                console.log(err.message)
            })
    }
    return (
        <Navbar className='mb-4' bg="dark" variant="dark">
            <Container className='d-flex'>
                <Navbar.Brand href="./">micro-blogger.com</Navbar.Brand>
                <Nav className='d-flex align-items-center'>
                    <Avatar src={photoURL !== "" ? photoURL : './emptyAvatar.jpeg'} sx={{ width: 24, height: 24 }} />
                    <NavDropdown title="" id="collasible-nav-dropdown" >
                        <NavDropdown.Item href="./profile">User Settings
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={logout}>
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar