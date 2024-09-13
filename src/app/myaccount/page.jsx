"use client";
import React, { useState, useEffect } from 'react';
import Account from '@/components/Account';
import DoctorAccount from '@/components/DoctorAccount';
import { useAuth } from '@/contexts/AuthContexts';
import { db } from '@/lib/firebase'; // Adjust the path as needed
import { doc, getDoc } from 'firebase/firestore';

const MyAccountPage = () => {
  const { currentUser } = useAuth();
  const [isDoctor, setIsDoctor] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkIfDoctor = async () => {
      if (currentUser) {
        const doctorDocRef = doc(db, 'doctors', currentUser.uid);
        const docSnap = await getDoc(doctorDocRef);

        if (docSnap.exists()) {
          setIsDoctor(true);
        } else {
          setIsDoctor(false);
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    checkIfDoctor();
  }, [currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isDoctor ? <DoctorAccount /> : <Account />;
};

export default MyAccountPage;
