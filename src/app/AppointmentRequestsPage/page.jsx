"use client";
import { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useAuth } from '@/contexts/AuthContexts';
import dayjs from 'dayjs'; // Import dayjs
import customParseFormat from 'dayjs/plugin/customParseFormat'; // Import plugin for custom time parsing

// Extend dayjs with the customParseFormat plugin
dayjs.extend(customParseFormat);

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

    // Helper function to sort appointments by time using 24-hour format
    const sortAppointmentsByTime = (appointments) => {
        return appointments.sort((a, b) => {
            const timeA = dayjs(a.time, 'hh:mm A').format('HH:mm');
            const timeB = dayjs(b.time, 'hh:mm A').format('HH:mm');
            return timeA.localeCompare(timeB);
        });
    };

    // Helper function to format date in DD/MM/YYYY format
    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    };

    return (
        <div>
            <Typography fontWeight={'bold'} variant="h4" sx={{ padding: '25px' }}>
                Appointments Management
            </Typography>

            {/* Tabs for switching between Appointment Requests and Confirmed Appointments */}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    aria-label="appointments tabs"
                >
                    <Tab label="Appointment Requests" />
                    <Tab label="Confirmed Appointments" />
                </Tabs>
            </Box>

            {/* Sticky Date Container for Confirmed Appointments */}
            {tabValue === 1 && (
                <Box
                    sx={{
                        position: 'sticky',
                        top: 0,
                        backgroundColor: '#fff',
                        zIndex: 1,
                        padding: '1rem',
                        borderBottom: '2px solid black',
                    }}
                >
                    <Typography variant="body1" color="textSecondary">
                        Date: {appointments.length > 0 ? formatDate(appointments[0].date) : ''}
                    </Typography>
                </Box>
            )}

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', padding: '2rem' }}>
                {loading ? (
                    <Typography>Loading...</Typography>
                ) : appointments.length === 0 ? (
                    <Typography>No appointments available.</Typography>
                ) : (
                    <>
                        {/* Header for columns based on tab value */}
                        {appointments.length > 0 && (
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: tabValue === 0 ? '1fr 1fr 1fr 1fr' : '1fr 1fr 1fr',
                                    gap: '1rem',
                                    width: '100%',
                                    backgroundColor: '#f0f0f0',
                                    padding: '1rem',
                                    borderBottom: '2px solid black',
                                    marginBottom: '1rem',
                                }}
                            >
                                {tabValue === 0 && (
                                    <>
                                        <Typography fontWeight="bold">Date</Typography>
                                        <Typography fontWeight="bold">Time</Typography>
                                        <Typography fontWeight="bold">Patient's Name</Typography>
                                        <Typography fontWeight="bold">Patient's Email</Typography>
                                    </>
                                )}

                                {tabValue === 1 && (
                                    <>
                                        <Typography fontWeight="bold">Time</Typography>
                                        <Typography fontWeight="bold">Patient's Name</Typography>
                                        <Typography fontWeight="bold">Patient's Email</Typography>
                                    </>
                                )}
                            </Box>
                        )}

                        {/* Display sorted appointments */}
                        {sortAppointmentsByTime(
                            appointments.filter(appointment =>
                                tabValue === 0
                                    ? appointment.status === 'Pending'
                                    : appointment.status === 'Accepted'
                            )
                        ).map((appointment) => (
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
                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: tabValue === 0 ? '1fr 1fr 1fr 1fr' : '1fr 1fr 1fr',
                                        width: '100%',
                                    }}
                                >
                                    {/* Row content: Date, Time, Patient's Name, Patient's Email */}
                                    {tabValue === 0 && (
                                        <>
                                            <Typography sx={{ padding: '0.5rem' }}>
                                                {formatDate(appointment.date)}
                                            </Typography>
                                            <Typography sx={{ padding: '0.5rem' }}>
                                                {appointment.time}
                                            </Typography>
                                            <Typography sx={{ padding: '0.5rem' }}>
                                                {appointment.patientsName}
                                            </Typography>
                                            <Typography sx={{ padding: '0.5rem' }}>
                                                {appointment.patientsEmail}
                                            </Typography>
                                        </>
                                    )}

                                    {tabValue === 1 && (
                                        <>
                                            <Typography sx={{ padding: '0.5rem' }}>
                                                {appointment.time}
                                            </Typography>
                                            <Typography sx={{ padding: '0.5rem' }}>
                                                {appointment.patientsName}
                                            </Typography>
                                            <Typography sx={{ padding: '0.5rem' }}>
                                                {appointment.patientsEmail}
                                            </Typography>
                                        </>
                                    )}
                                </Box>

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
                        ))}
                    </>
                )}
            </Box>
        </div>
    );
}
