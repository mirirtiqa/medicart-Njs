"use client";
import { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useAuth } from '@/contexts/AuthContexts';

export default function AppointmentRequestsPage() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();
    const [tabValue, setTabValue] = useState(0);

    const fetchDoctorAppointments = async () => {
        try {
            const appointmentsRef = collection(db, 'appointments');
            const querySnapshot = await getDocs(appointmentsRef);

            const doctorAppointments = querySnapshot.docs
                .filter(doc => doc.data().doctorId === currentUser?.uid)
                .map(doc => ({ id: doc.id, ...doc.data() }));

            setAppointments(doctorAppointments);
        } catch (error) {
            console.error('Error fetching doctor appointments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAppointmentStatus = async (appointmentId, newStatus) => {
        try {
            const appointmentRef = doc(db, 'appointments', appointmentId);
            await updateDoc(appointmentRef, {
                status: newStatus,
            });
            setAppointments(prevAppointments =>
                prevAppointments.map(appointment =>
                    appointment.id === appointmentId ? { ...appointment, status: newStatus } : appointment
                )
            );
        } catch (error) {
            console.error('Error updating appointment status:', error);
        }
    };

    useEffect(() => {
        if (currentUser) {
            fetchDoctorAppointments();
        }
    }, [currentUser]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <div>
            <Typography fontWeight={'bold'} variant="h4" sx={{ padding: '25px' }}>
                Appointments Management
            </Typography>

            {/* Tabs for switching between Appointment Requests and Confirmed Appointments */}
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="appointments tabs" sx={{ marginBottom: '20px' }}>
                <Tab label="Appointment Requests" />
                <Tab label="Confirmed Appointments" />
            </Tabs>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', padding: '2rem' }}>
                {loading ? (
                    <Typography>Loading...</Typography>
                ) : appointments.length === 0 ? (
                    <Typography>No appointments available.</Typography>
                ) : (
                    appointments
                        .filter(appointment =>
                            tabValue === 0
                                ? appointment.status === 'Pending'
                                : appointment.status === 'Accepted'
                        )
                        .map((appointment) => (
                            <Card
                                key={appointment.id}
                                sx={{
                                    width: '100%',
                                    border: '2px solid black',
                                    borderRadius: '10px',
                                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',
                                    padding: '10px',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {tabValue === 0 ? 'Appointment Request' : 'Confirmed Appointment'}
                                    </Typography>
                                    <Typography sx={{ padding: '0.5rem' }}>
                                        Patient's Name: {appointment.patientsName}
                                    </Typography>
                                    <Typography sx={{ padding: '0.5rem' }}>Patient's Email: {appointment.patientsEmail}</Typography>
                                    <Typography sx={{ padding: '0.5rem' }}>Date: {appointment.date}</Typography>
                                    <Typography sx={{ padding: '0.5rem' }}>Time: {appointment.time}</Typography>
                                    <Typography
                                        sx={{
                                            padding: '0.5rem',
                                            color: appointment.status === 'Accepted' ? '#01D6A3' : appointment.status === 'Declined' ? 'red' : 'black',
                                        }}
                                    >
                                        Status: {appointment.status}
                                    </Typography>
                                </CardContent>

                                {tabValue === 0 && appointment.status === 'Pending' && (
                                    <Box sx={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            onClick={() => handleAppointmentStatus(appointment.id, 'Accepted')}
                                        >
                                            Accept
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => handleAppointmentStatus(appointment.id, 'Declined')}
                                        >
                                            Decline
                                        </Button>
                                    </Box>
                                )}
                            </Card>
                        ))
                )}
            </Box>
        </div>
    );
}
