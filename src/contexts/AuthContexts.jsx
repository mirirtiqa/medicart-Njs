"use client";
import React, {useContext , useState, useEffect} from "react";
import { auth } from '@/lib/firebase'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,GoogleAuthProvider, signInWithPopup } from "firebase/auth";



export const AuthContext = React.createContext();
const googleProvider = new GoogleAuthProvider();

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}){
    const [currentUser,setCurrentUser] = useState()
    const [loading,setLoading] = useState(true)
    
    function signup(email,password){
        return createUserWithEmailAndPassword(auth,email,password)
         // return createUserWithEmailAndPassword(auth,email,password)
  }

  function login(email,password){
    return signInWithEmailAndPassword(auth,email,password)
   
     // return createUserWithEmailAndPassword(auth,email,password)
}
function logout(){
    signOut(auth)
}
function signInWithGoogle(){
    return signInWithPopup(auth, googleProvider);
}

//figure the useEffect 
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(user =>{
        setCurrentUser(user)
        setLoading(false)
        
    })

    return unsubscribe
  },[])
    
    

    const value = {
        currentUser,
        login,
        signup,
        logout,
        signInWithGoogle,
    }
    
    return (
        <AuthContext.Provider value = {value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}