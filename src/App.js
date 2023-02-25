import './App.css'
import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage/HomePage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import { Routes, Route } from "react-router-dom";
import LoginPage from './components/LoginPage/LoginPage';
import { auth , suscribeToAuthChange } from './utils/firebaselib';
import { AuthProvider } from './contexts/AuthContext';
import LoaderComponent from './components/LoaderComponent/LoaderComponent';
import { useNavigate } from "react-router-dom";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    suscribeToAuthChange(setCurrentUser);

      setTimeout(() => {
        setIsLoading(false);
        if (auth.currentUser) {
          navigate('/home');
        } else {
          navigate('/login')
        }
      }, 1000);
  }, []);

  return (
    <AuthProvider value={{ currentUser, setCurrentUser }}>
      <div className='app-wrapper'>
          <Routes>
            <Route path="/" element={<LoaderComponent />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
