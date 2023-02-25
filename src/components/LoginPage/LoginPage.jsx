import React, { useState } from 'react'
import LoginForm from '../LoginForm/LoginForm'
import SignupForm from '../SignupForm/SignupForm'

function LoginPage() {
    const [isSignup, setIsSignup] = useState(false);

    return (
        <>
            {isSignup ? <SignupForm setIsSignup={setIsSignup} /> : <LoginForm setIsSignup={setIsSignup} />}
        </>
    )
}

export default LoginPage