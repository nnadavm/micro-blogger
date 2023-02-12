import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function NavBar() {
        const pathname = window.location.pathname;
  return (
    <Navbar className='mb-4' bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="./">micro-blogger.com</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link style={{pointerEvents: pathname !== '/' ? '' : 'none'}} href="./">Home</Nav.Link>
            <Nav.Link style={{pointerEvents: pathname !== '/profile' ? '' : 'none'}} href="./profile">Profile</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  )
}

export default NavBar