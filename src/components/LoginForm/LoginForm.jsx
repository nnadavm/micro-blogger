import React, { useState, useContext } from 'react';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBIcon } from 'mdb-react-ui-kit';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../../utils/firebaselib';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import { Alert, Button } from 'react-bootstrap';

function LoginForm({ setIsSignup }) {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const initialState = { email: '', password: '' };
  const [userInput, setUserInput] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  function handleOnChange(e, key) {
    setUserInput(pre => {
      return {
        ...pre,
        [key]: e.target.value
      }
    })
  }

  async function handleGoogleLogin() {
    signInWithPopup(auth, googleProvider)
      .then((cred) => {
        setCurrentUser(cred.user)
        console.log('user logged in:', cred.user)
        if (cred) navigate("/home");
      })
      .catch(err => {
        console.log(err.message)
        setErrorMessage(err.message);
      })
  };

  function loginSubmit() {
    signInWithEmailAndPassword(auth, userInput.email, userInput.password)
      .then(cred => {
        console.log('user logged in:', cred.user);
        if (cred) navigate("/home");
      })
      .catch(err => {
        console.log(err.message);
        setErrorMessage(err.message);
      })
  }

  return (
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">Please enter your email and password</p>

              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Email address' type='email' size="lg" value={userInput.email} onChange={(e) => handleOnChange(e, "email")} />
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' size="lg" value={userInput.password} onChange={(e) => handleOnChange(e, "password")} />

              <Button className='login-btn mx-2 px-5' variant="outline-light" size="lg" onClick={loginSubmit}>Login</Button>

              {errorMessage ? <Alert variant='danger'>{errorMessage}</Alert> : ''}

              <p className="text-white-50 mb-1">Sign in with Google:</p>

              <div className='d-flex flex-row mt-1 mb-1'>
                <MDBBtn tag='a' color='none'  style={{ color: 'white' }} onClick={handleGoogleLogin}>
                  <MDBIcon fab icon='google' size="lg" />
                </MDBBtn>
              </div>

              <div>
                <p className="mb-0">Don't have an account? <a className="text-white-50 fw-bold" onClick={() => setIsSignup(true)}>Sign Up</a></p>
              </div>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default LoginForm;