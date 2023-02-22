import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseconfig";

export const AuthContext = React.createContext();

export function AuthProvider({ children , value }) {
    // const [currentUser, setCurrentUser] = useState(null);

    // useEffect(() => {
    //     onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             const userObj = {
    //                 uid: user.uid,
    //                 email: user.email,
    //                 displayName: user.displayName,
    //                 photoURL: user.photoURL
    //             }
    //             setCurrentUser(userObj);
    //         } else {
    //             setCurrentUser(null);
    //         }
    //     });
    //     console.log('useEffect context' , currentUser)
    // }, []);

    return (
        <AuthContext.Provider value={ value }>
            {children}
        </AuthContext.Provider>
    );
};