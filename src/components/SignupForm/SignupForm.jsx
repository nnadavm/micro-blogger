import React, { useState, useContext } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
}
  from 'mdb-react-ui-kit';
import { auth } from '../../firebaseconfig';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../contexts/AuthContext';



function SignupForm({ setIsSignup }) {
  const { currentUser , setCurrentUser } = useContext(AuthContext);

  const initialState = { displayName: '', email: '', password: '' };
  const [userInput, setUserInput] = useState(initialState);
  const navigate = useNavigate();

  function handleOnChange(e, key) {
    setUserInput(pre => {
      return {
        ...pre,
        [key]: e.target.value
      }
    })
  }

  function handleSignup() {
    createUserWithEmailAndPassword(auth, userInput.email, userInput.password)
      .then(cred => {
        updateProfile(auth.currentUser, { displayName: userInput.displayName });
        const userObj = {
          ...currentUser,
          displayName: userInput.displayName,
        }
        setCurrentUser(userObj);
        console.log('user created:', cred.user)
      })
      .catch(err => {
        console.log(err.message)
      })
  }

  return (
    <MDBContainer fluid>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>
          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
              <p className="text-white-50 mb-5">Please enter your email, choose a display name and password</p>

              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Email address' type='email' size="lg" value={userInput.email} onChange={(e) => handleOnChange(e, "email")} />

              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Display Name' type='text' size="lg" value={userInput.displayName} onChange={(e) => handleOnChange(e, "displayName")} />

              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' type='password' size="lg" value={userInput.password} onChange={(e) => handleOnChange(e, "password")} />

              <MDBBtn outline className='mx-2 px-5' color='white' size='lg' onClick={handleSignup}>
                Sign Up
              </MDBBtn>

              <div>
                <p className="mb-0">Already have an account? <a className="text-white-50 fw-bold" onClick={() => setIsSignup(false)}>Login</a></p>
              </div>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default SignupForm;