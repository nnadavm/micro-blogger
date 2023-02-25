import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { auth } from '../../utils/firebaselib';
import { signOut } from 'firebase/auth';
import { Avatar } from '@mui/material';
import { AuthContext } from '../../contexts/AuthContext';
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    function handleLogout() {
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
            <Container className='d-flex w-75'>
                <Link to='/home'><Navbar.Brand>micro-blogger.com</Navbar.Brand></Link>
                <Nav className='d-flex align-items-center'>
                    <Avatar src={currentUser ? currentUser.photoURL : './emptyAvatar.jpeg'} sx={{ width: 24, height: 24 }} />
                    <NavDropdown title="" id="collasible-nav-dropdown" >
                        <NavDropdown.Item onClick={() => navigate('/profile')}>User Settings
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={handleLogout}>
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavBar