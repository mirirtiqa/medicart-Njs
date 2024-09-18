"use client";
import { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useAuth } from '@/contexts/AuthContexts';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'; 

// Extend dayjs with the plugins
dayjs.extend(isSameOrAfter);

export default function MyAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0); // State to manage tab selection
  const { currentUser } = useAuth();

  const fetchDoctorName = async (doctorId) => {
    try {
      const doctorRef = doc(db, 'doctors', doctorId); // Assuming doctor's details are in 'doctors' collection
      const doctorSnap = await getDoc(doctorRef);
      if (doctorSnap.exists()) {
        return doctorSnap.data().name; // Fetch the doctor's name
      }
      return 'Unknown Doctor';
    } catch (error) {
      console.error('Error fetching doctor details:', error);
      return 'Unknown Doctor';
    }
  };

  const fetchUserAppointments = async () => {
    try {
      const appointmentsRef = collection(db, 'appointments');
      const querySnapshot = await getDocs(appointmentsRef);

      const userAppointments = await Promise.all(
        querySnapshot.docs
          .filter(doc => doc.data().userId === currentUser?.uid)
          .map(async (doc) => {
            const appointmentData = doc.data();
            const doctorName = await fetchDoctorName(appointmentData.doctorId); // Fetch the doctor's name
            return { id: doc.id, ...appointmentData, doctorName };
          })
      );

      setAppointments(userAppointments);
    } catch (error) {
      console.error('Error fetching user appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchUserAppointments();
    }
  }, [currentUser]);

  const getColorBasedOnStatus = (status) => {
    switch (status) {
      case 'Accepted':
        return '#01D6A3'; // Text color for accepted status
      case 'Declined':
        return 'red'; // Text color for declined status
      default:
        return '#000'; // Default text color
    }
  };

  // Function to handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Split appointments into upcoming and past
  const now = dayjs();
  const upcomingAppointments = appointments.filter(appointment => dayjs(appointment.date).isSameOrAfter(now, 'day'));
  const pastAppointments = appointments.filter(appointment => dayjs(appointment.date).isBefore(now, 'day'));

  const renderAppointments = (appointmentsList) => {
    if (appointmentsList.length === 0) {
      return <Typography>No appointments.</Typography>;
    }

    return appointmentsList.map((appointment) => {
      const statusColor = getColorBasedOnStatus(appointment.status);

      return (
        <Card
          key={appointment.id}
          sx={{
            width: '100%',
            border: '2px solid black',
            borderRadius: '10px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',
            padding: '10px',
            backgroundColor: '#ffffff', // Keep the card background color consistent
          }}
        >
          <CardContent>
            <Typography variant="h6" component="div">Appointment</Typography>
            <Typography sx={{ padding: '0.5rem' }}>
              Doctor: {appointment.doctorName.startsWith('Dr.') ? appointment.doctorName : `Dr. ${appointment.doctorName}`}
            </Typography>
            <Typography sx={{ padding: '0.5rem' }}>Date: {appointment.date}</Typography>
            <Typography sx={{ padding: '0.5rem' }}>Time: {appointment.time}</Typography>
            <Typography sx={{ padding: '0.5rem', color: statusColor }}>
              Status: {appointment.status}
            </Typography>
          </CardContent>
        </Card>
      );
    });
  };

  return (
    <div>
      <Typography fontWeight={'bold'} variant="h4" sx={{ padding: '25px' }}>My Appointments</Typography>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="My Appointments" />
        <Tab label="Appointment History" />
      </Tabs>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', padding: '2rem' }}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <>
            {/* Display upcoming appointments if the first tab is selected */}
            {tabValue === 0 && renderAppointments(upcomingAppointments)}
            
            {/* Display past appointments if the second tab is selected */}
            {tabValue === 1 && renderAppointments(pastAppointments)}
          </>
        )}
      </Box>
    </div>
  );
}
