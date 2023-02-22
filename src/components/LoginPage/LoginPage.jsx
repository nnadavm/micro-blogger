import React, { useState, useContext, useEffect } from 'react'
import LoginForm from '../LoginForm/LoginForm'
import SignupForm from '../SignupForm/SignupForm'
import { AuthContext } from '../../contexts/AuthContext';
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
    const { currentUser } = useContext(AuthContext);
    const [isSignup, setIsSignup] = useState(false);
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (currentUser) navigate("/home");
    // }, [currentUser]);

    return (
        <>
            {isSignup ? <SignupForm setIsSignup={setIsSignup} /> : <LoginForm setIsSignup={setIsSignup} />}
        </>
    )
}

export default LoginPage