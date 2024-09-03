"use client";
import {useAuth} from '@/contexts/AuthContexts';
export default function Profile() {
    const {currentUser, logout} = useAuth();
    console.log("heyy from profile page")
    console.log(currentUser);
    const userDetails = {
        uid: currentUser.uid || "",
        email: currentUser.email || "",
        displayName: currentUser.displayName || "",
        photoURL: currentUser.photoUR || "",
      };
      {console.log(userDetails)
      }
    return (
     <>
     Hi!
     
     
     </>
    );
  }