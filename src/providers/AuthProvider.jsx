import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";


export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState('');
    console.log(loading, user);

    // Google Sign-In
    const googleProvider = new GoogleAuthProvider();
    const loginWithGoogle = () => {
        setLoading(true);
        return (
            signInWithPopup(auth, googleProvider)
            // .then(result => setUser(result.user))
            // .catch(error => alert("ERROR", error.code))
        );
    }

    // Email-Password Sign In
    const loginWithEmailAndPassword = (email, password) => {
        setLoading(true);
        return (
            signInWithEmailAndPassword(auth, email, password)
            // .then(result => setUser(result.user))
            // .catch(error => console.log("Error", error.message))
        );
    }

    // Create/Register/Sign-Up New User with Email-Password
    const createAccount = (email, password) => {
        setLoading(true);
        return (
            createUserWithEmailAndPassword(auth, email, password)
            // .then(result => setUser(result.user))
            // .catch(error => console.log("Error", error.message))
        );
    }

    // Reset Password
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
                // .then(() => {
                //      const link = "mail.google.com";
                //      window.open(`//${link}`, "_blank");
                //      logOut();
                //      setLoading(false);
                // })
                // .catch(error => console.log(error.message))
    }

    // Log-Out 
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
                setUser(currentUser);
                setLoading(false);
        })
        return () => {
            unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        setUser,
        loginWithGoogle,
        loginWithEmailAndPassword,
        createAccount,
        loading,
        setLoading,
        userEmail,
        setUserEmail,
        resetPassword,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;