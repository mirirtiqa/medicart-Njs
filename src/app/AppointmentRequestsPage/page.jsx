"use client"
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useAuth } from '@/contexts/AuthContexts';

export default function AppointmentRequestsPage() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state to handle spinner
    const { currentUser } = useAuth();

    const fetchDoctorAppointments = async () => {
        try {
            const appointmentsRef = collection(db, 'appointments');
            const querySnapshot = await getDocs(appointmentsRef);

            const doctorAppointments = querySnapshot.docs
                .filter(doc => doc.data().doctorId === currentUser?.uid) // Assuming currentDoctor.uid is the doctor's UID
                .map(doc => ({ id: doc.id, ...doc.data() }));
        
            setAppointments(doctorAppointments);
        } catch (error) {
            console.error('Error fetching doctor appointments:', error);
        } finally {
            setLoading(false); // Stop loading after data is fetched
        }
    };

    useEffect(() => {
        if (currentUser) {
            fetchDoctorAppointments();
        }
    }, [currentUser]);

    return (
        <div>
            <Typography fontWeight={'bold'} variant="h4" sx={{ padding: '25px' }}>Appointment Requests</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', padding: '2rem' }}>
                {loading ? (
                    <Typography>Loading...</Typography>
                ) : appointments.length === 0 ? (
                    <Typography>No appointment requests.</Typography>
                ) : (
                    appointments.map((appointment) => (
                        <Card
                            key={appointment.id}
                            sx={{
                                width: '100%',
                                border: '2px solid black',
                                borderRadius: '10px',
                                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',
                                padding: '10px',
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" component="div">Appointment Request</Typography>
                                <Typography sx={{ padding: '0.5rem' }}>User ID: {appointment.userId}</Typography>
                                <Typography sx={{ padding: '0.5rem' }}>Date: {appointment.date}</Typography>
                                <Typography sx={{ padding: '0.5rem' }}>Time: {appointment.time}</Typography>
                                <Typography sx={{ padding: '0.5rem' }}>Status: {appointment.status}</Typography>
                            </CardContent>
                        </Card>
                    ))
                )}
            </Box>
        </div>
    );
}
