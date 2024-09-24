"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';  

const DoctorDetails = ({ params }) => {
  const router = useRouter();
  const id = params.id; 
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      if (!id) return;

      const doctorRef = doc(db, 'doctors', id);
      const doctorSnap = await getDoc(doctorRef);

      if (doctorSnap.exists()) {
        setDoctor(doctorSnap.data());
      } else {
        console.error('No such doctor found!');
      }
    };

    fetchDoctor();
  }, [id]);

  if (!doctor) return <p>Loading doctor details...</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>{doctor.name}</h1>
      <p><strong>Specialization:</strong> {doctor.specialization}</p>
      <p><strong>Experience:</strong> {doctor.experience} years</p>
      <p><strong>Consultation Fees:</strong> {doctor.fees}</p>
      <p><strong>Doctor Code:</strong> {doctor.code}</p>

    </div>
  );
};

export default DoctorDetails;
