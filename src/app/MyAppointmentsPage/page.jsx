"use client";
import { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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

      // Sort appointments by Date and Time
      const sortedAppointments = userAppointments.sort((a, b) => {
        const dateA = dayjs(`${a.date} ${a.time}`);
        const dateB = dayjs(`${b.date} ${b.time}`);
        return dateA.isAfter(dateB) ? 1 : -1;
      });

      setAppointments(sortedAppointments);
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

  const renderAppointmentsTable = (appointmentsList) => {
    if (appointmentsList.length === 0) {
      return <Typography>No appointments.</Typography>;
    }

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography fontWeight={'bold'}>Date</Typography></TableCell>
              <TableCell><Typography fontWeight={'bold'}>Time</Typography></TableCell>
              <TableCell><Typography fontWeight={'bold'}>Doctor Name</Typography></TableCell>
              <TableCell><Typography fontWeight={'bold'}>Status</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointmentsList.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{dayjs(appointment.date).format('DD/MM/YYYY')}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>
                  {appointment.doctorName.startsWith('Dr.') ? appointment.doctorName : `Dr. ${appointment.doctorName}`}
                </TableCell>
                <TableCell sx={{ color: getColorBasedOnStatus(appointment.status) }}>
                  {appointment.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
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

      <Box sx={{ padding: '2rem' }}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <>
            {/* Display upcoming appointments if the first tab is selected */}
            {tabValue === 0 && renderAppointmentsTable(upcomingAppointments)}
            
            {/* Display past appointments if the second tab is selected */}
            {tabValue === 1 && renderAppointmentsTable(pastAppointments)}
          </>
        )}
      </Box>
    </div>
  );
}
