import './App.css'
import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage/HomePage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import NavBar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserCredContext from './contexts/UserCredContext';
import LoginPage from './components/LoginPage/LoginPage';
import { auth } from './firebaseconfig';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userObj = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        }
        setCurrentUser(userObj);
      } else {
        setCurrentUser(null);
      }
    });
    console.log('useEffect context', currentUser)
  }, []);

  return (
    <AuthProvider value={{ currentUser, setCurrentUser }}>
      <div className='app-wrapper'>
        <div className='page-wrapper'>
          <BrowserRouter>
            <Routes>
              {!currentUser ?
                <Route path="/" element={<LoginPage />} />
                :
                <Route path="/" element={<HomePage />} />
              }
              <Route path="/home" element={<HomePage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="login" element={<LoginPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
