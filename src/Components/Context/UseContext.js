import React, { createContext, useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  getAuth,
  sendEmailVerification,

} from "firebase/auth";
import app from '../Firebase/Firebase.Config'
const auth = getAuth(app);
export const authContest = createContext();
const UseContext = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading]= useState(false)


  //Crating user with email and password
  const creatingUserWithEp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };


  //Login with Google Provider
  const googleProvider = new GoogleAuthProvider()
  const loginWithGoogle =()=>{
    return signInWithPopup(auth,googleProvider )
  }
 


  // login with email password
  const loginWithEp = (email, password)=>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }


   // Forget Password
   const resetPassword = email => {
    setLoading(true)
    return sendPasswordResetEmail(auth, email)
  }

  useEffect(() => {
    //this part will execute once the component is mounted.
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => {
      //this part will execute once the component is unmounted.
      unsubscribe()
    }
  }, [])

  const logout = () => {
    setLoading(true)
    localStorage.removeItem('token')
    return signOut(auth)
  }
  
  //update profile of user
  const updatingUser = (name, image) => {
    setLoading(true)
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    });
  };

  const verifyEmail = () => {
    setLoading(true)
    return sendEmailVerification(auth.currentUser)
    
  }


  const authInfo = { auth, user, creatingUserWithEp, updatingUser, loginWithEp,logout, loading, setLoading, loginWithGoogle, resetPassword, verifyEmail};
  return (
    <div>
      <authContest.Provider value={authInfo}>{children}</authContest.Provider>
    </div>
  );
};

export default UseContext;


