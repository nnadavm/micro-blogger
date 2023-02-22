import React, {useState , useContext} from 'react';
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
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signOut,
  onAuthStateChanged, signInWithPopup
} from 'firebase/auth'
import { auth, googleProvider } from '../../firebaseconfig';
import { AuthContext } from '../../contexts/AuthContext';
import { Link, useNavigate } from "react-router-dom";


function LoginForm({setIsSignup}) {
  const { currentUser , setCurrentUser } = useContext(AuthContext);
  const initialState = {email: '', password: ''};
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

  function handleGoogleLogin() {
    signInWithPopup(auth, googleProvider)
    .then((cred) => {
      setCurrentUser(cred.user)
        console.log('user logged in:', cred.user)
        if (cred) navigate("/home");
      })
      .catch(err => {
        console.log(err.message)
      })
    }

  function loginSubmit() {
    signInWithEmailAndPassword(auth, userInput.email, userInput.password)
      .then(cred => {
        console.log('user logged in:', cred.user)
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

              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">Please enter your email and password</p>

              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Email address'  type='email' size="lg" value={userInput.email} onChange={(e) => handleOnChange(e, "email")} />
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' size="lg" value={userInput.password} onChange={(e) => handleOnChange(e, "password")}/>

              <MDBBtn onClick={loginSubmit} outline className='mx-2 px-5' color='white' size='lg'>
                Login
              </MDBBtn>

              <div className='d-flex flex-row mt-3 mb-5'>
                <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }} onClick={handleGoogleLogin}>
                  <MDBIcon fab icon='google' size="lg" />
                </MDBBtn>
              </div>

              <div>
                <p className="mb-0">Don't have an account? <a className="text-white-50 fw-bold" onClick={()=> setIsSignup(true)}>Sign Up</a></p>
              </div>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default LoginForm;