import './App.css'
import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage/HomePage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import NavBar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UsernameContext from './contexts/UsernameContext';

function App() {
  const [username, setUsername] = useState(JSON.parse(localStorage.getItem('username')));

  useEffect(() => {
    if (username === null) {
      setUsername('guest');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('username', JSON.stringify(username));
  }, [username]);

  return (
    <div className='app-wrapper'>
      <UsernameContext.Provider value={{ username, setUsername }}>
        <NavBar />
        <div className='page-wrapper'>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="profile" element={<ProfilePage />} />
              {/* <Route path="*" element={<NoPage />} /> */}
            </Routes>
          </BrowserRouter>
        </div>
      </UsernameContext.Provider>
    </div>
  );
}

export default App;
