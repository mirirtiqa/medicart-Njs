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
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

// Extend dayjs with the customParseFormat and isSameOrAfter plugins
dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);

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
            await updateDoc(appointmentRef, { status: newStatus });
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

    const sortAppointmentsByTime = (appointments) => {
        return appointments.sort((a, b) => {
            const timeA = dayjs(a.time, 'hh:mm A').format('HH:mm');
            const timeB = dayjs(b.time, 'hh:mm A').format('HH:mm');
            return timeA.localeCompare(timeB);
        });
    };

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    };

    const groupAppointmentsByDate = (appointments) => {
        return appointments.reduce((groups, appointment) => {
            const date = appointment.date;
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(appointment);
            return groups;
        }, {});
    };

    return (
        <div>
            <Typography fontWeight={'bold'} variant="h4" sx={{ padding: '25px' }}>
                Appointments Management
            </Typography>

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

            <Box sx={{ padding: '2rem' }}>
                {loading ? (
                    <Typography>Loading...</Typography>
                ) : appointments.length === 0 ? (
                    <Typography>No appointments available.</Typography>
                ) : (
                    <>
                        {/* Appointment Requests */}
                        {tabValue === 0 && (
                            <>
                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr 1fr 1fr',
                                        gap: '1rem',
                                        marginBottom: '1rem',
                                        backgroundColor: '#f0f0f0',
                                        padding: '1rem',
                                        borderBottom: '2px solid black',
                                    }}
                                >
                                    <Typography fontWeight="bold">Date</Typography>
                                    <Typography fontWeight="bold">Time</Typography>
                                    <Typography fontWeight="bold">Patient's Name</Typography>
                                    <Typography fontWeight="bold">Patient's Email</Typography>
                                </Box>
                                {sortAppointmentsByTime(
                                    appointments.filter(appointment => appointment.status === 'Pending')
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
                                            marginBottom: '1rem',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'grid',
                                                gridTemplateColumns: '1fr 1fr 1fr 1fr',
                                                width: '100%',
                                            }}
                                        >
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
                                        </Box>

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
                                    </Card>
                                ))}
                            </>
                        )}

                        {/* Confirmed Appointments */}
                        {tabValue === 1 && (
                            <>
                                {Object.entries(groupAppointmentsByDate(
                                    appointments.filter(appointment =>
                                        appointment.status === 'Accepted' &&
                                        dayjs(appointment.date, 'YYYY-MM-DD').isSameOrAfter(dayjs(), 'day')
                                    )
                                )).map(([date, appointmentsForDate]) => (
                                    <Box key={date}>
                                        <Box
                                            sx={{
                                                position: 'sticky',
                                                top: 0,
                                                backgroundColor: '#fff',
                                                zIndex: 1,
                                                padding: '1rem',
                                                borderBottom: '2px solid black',
                                                marginBottom: '1rem',
                                            }}
                                        >
                                            <Typography variant="body1" color="textSecondary">
                                                Date: {formatDate(date)}
                                            </Typography>
                                        </Box>

                                        <Box
                                            sx={{
                                                display: 'grid',
                                                gridTemplateColumns: '1fr 1fr 1fr',
                                                gap: '1rem',
                                                marginBottom: '1rem',
                                                backgroundColor: '#f0f0f0',
                                                padding: '1rem',
                                                borderBottom: '2px solid black',
                                            }}
                                        >
                                            <Typography fontWeight="bold">Time</Typography>
                                            <Typography fontWeight="bold">Patient's Name</Typography>
                                            <Typography fontWeight="bold">Patient's Email</Typography>
                                        </Box>

                                        {sortAppointmentsByTime(appointmentsForDate).map((appointment) => (
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
                                                    marginTop: '1rem',
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: 'grid',
                                                        gridTemplateColumns: '1fr 1fr 1fr',
                                                        width: '100%',
                                                    }}
                                                >
                                                    <Typography sx={{ padding: '0.5rem' }}>
                                                        {appointment.time}
                                                    </Typography>
                                                    <Typography sx={{ padding: '0.5rem' }}>
                                                        {appointment.patientsName}
                                                    </Typography>
                                                    <Typography sx={{ padding: '0.5rem' }}>
                                                        {appointment.patientsEmail}
                                                    </Typography>
                                                </Box>
                                            </Card>
                                        ))}
                                    </Box>
                                ))}
                            </>
                        )}
                    </>
                )}
            </Box>
        </div>
    );
}
