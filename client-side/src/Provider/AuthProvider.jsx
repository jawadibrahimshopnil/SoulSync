import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import app from './../Firebase/firebase.config';

const auth = getAuth(app)
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    

    const googleProvider = new GoogleAuthProvider();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }
    const logOutUser = () => {
        return signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            // because current will be null if logout, so cant find email for cookie clear
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = {email: userEmail};
            setUser(currentUser);
            

            if(currentUser){
                axios.post('https://soulsync-eta.vercel.app/jwt', loggedUser, {withCredentials: true})
                .then(()=>{
                    setLoading(false);
                })
            }else{
                axios.post('https://soulsync-eta.vercel.app/logout', loggedUser, {withCredentials: true})
                .then(()=>{
                    setLoading(false);
                })
            }
            
        })
        return () => {
            unSubscribe();
        }
    }, [])

    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        signInUser,
        signInWithGoogle,
        logOutUser
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;