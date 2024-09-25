"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc, collection, getDocs, setDoc, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useAuth } from '@/contexts/AuthContexts';
import { TextField } from '@mui/material';

const CustomFormControl = styled(FormControl)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(3),
  padding: theme.spacing(2),
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: '#f5f5f5',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#4caf50',
  },
  '& .MuiInputLabel-root': {
    fontSize: '1.1rem',
  },
}));

const DoctorDetails = ({ params }) => {
  const router = useRouter();
  const id = params.id; 
  const [doctor, setDoctor] = useState(null);
  const [selectedAppointments, setSelectedAppointments] = useState({});
  const [availableSlots, setAvailableSlots] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const { currentUser } = useAuth();
  const [isDoctor, setIsDoctor] = useState(false);

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

  useEffect(() => {
    const checkIfDoctor = async () => {
      if (currentUser) {
        const userDocRef = doc(db, 'doctors', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setIsDoctor(true);
        }
      }
    };
    checkIfDoctor();
  }, [currentUser]);

  const fetchAvailableSlots = async (date) => {
    try {
      const doctorRef = doc(db, 'doctors', id);
      const doctorSnap = await getDoc(doctorRef);

      if (doctorSnap.exists()) {
        const doctorData = doctorSnap.data();
        const availability = doctorData.availability || {};

        // Fetch accepted appointments for the doctor and the selected date
        const appointmentsRef = collection(db, 'appointments');
        const q = query(
          appointmentsRef,
          where('doctorId', '==', id),
          where('date', '==', date),
          where('status', '==', 'Accepted')
        );
        const querySnapshot = await getDocs(q);

        // Get the list of accepted time slots
        const acceptedTimes = querySnapshot.docs.map(doc => doc.data().time);

        // Filter out the accepted time slots from the available ones
        const availableTimes = (availability[date] || []).filter(time => !acceptedTimes.includes(time));

        // Check if the date is in the future before setting available slots
        const today = new Date();
        const selectedDate = new Date(date);

        if (selectedDate >= today) {
          setAvailableSlots((prev) => ({
            ...prev,
            [id]: availableTimes,
          }));
        } else {
          setAvailableSlots((prev) => ({
            ...prev,
            [id]: [], // Clear slots for past dates
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching available slots:', error);
    }
  };

  const handleDateSelection = (date) => {
    if (selectedAppointments[id]?.date === date) {
      setSelectedAppointments((prevState) => ({
        ...prevState,
        [id]: { ...prevState[id], date: undefined, time: undefined },
      }));
      setAvailableSlots((prevState) => ({
        ...prevState,
        [id]: [],
      }));
    } else {
      fetchAvailableSlots(date);
      setSelectedAppointments((prevState) => ({
        ...prevState,
        [id]: { date },
      }));
    }
  };

  const handleSlotSelection = (time) => {
    setSelectedAppointments((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        time: prevState[id]?.time === time ? undefined : time, // Deselect if clicked again
      },
    }));
  };

  const handleBookAppointment = async () => {
    // Check if the logged-in user is a doctor
    if (isDoctor) {
      setDialogMessage('Doctors cannot book appointments.');
      setOpenDialog(true);
      return;
    }

    const selectedAppointment = selectedAppointments[id];

    if (!currentUser) {
      setDialogMessage('Please log in to book an appointment.');
      setOpenDialog(true);
      return;
    }

    if (!selectedAppointment || !selectedAppointment.date || !selectedAppointment.time) {
      setDialogMessage('Please select a date and time.');
      setOpenDialog(true);
      return;
    }

    try {
      const { date, time } = selectedAppointment;
      const appointmentId = `${currentUser.uid}_${id}_${date}_${time}`;
      const appointmentRef = doc(db, 'appointments', appointmentId);

      const patientsName = currentUser.displayName || 'Unknown Patient';
      const patientsEmail = currentUser.email || 'Unknown Email';
      const doctorName = `Dr. ${doctor.name || 'Unknown Doctor'}`;

      await setDoc(appointmentRef, {
        userId: currentUser.uid,
        doctorId: id,
        doctorName,
        patientsName,
        patientsEmail,
        date,
        time,
        status: 'Pending',
      });

      setDialogMessage('Appointment request sent successfully.');
      setOpenDialog(true);
    } catch (error) {
      console.error('Error booking appointment:', error);
      setDialogMessage('Failed to book appointment.');
      setOpenDialog(true);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  if (!doctor) return <p>Loading doctor details...</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>{doctor.name}</h1>
      <p><strong>Specialization:</strong> {doctor.specialization}</p>
      <p><strong>Experience:</strong> {doctor.experience} years</p>
      <p><strong>Consultation Fees:</strong> {doctor.fees}</p>
      <p><strong>Doctor Code:</strong> {doctor.code}</p>

      <Box sx={{ marginTop: '20px' }}>
        <InputLabel>Select a Date:</InputLabel>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {doctor.availability
            ? Object.keys(doctor.availability)
              .sort((a, b) => new Date(a) - new Date(b)) // Sort dates in ascending order
              .filter(date => new Date(date) >= new Date()) // Filter out past dates
              .map((date) => (
                <Button
                  key={date}
                  variant={selectedAppointments[id]?.date === date ? 'contained' : 'outlined'}
                  sx={{ margin: '0.5rem', textTransform: 'none' }}
                  onClick={() => handleDateSelection(date)}
                >
                  {new Date(date).toLocaleDateString('en-GB')}
                </Button>
              ))
            : 'No availability'}
        </Box>
      </Box>

      {availableSlots[id] && availableSlots[id].length > 0 && (
        <Box sx={{ marginTop: '20px' }}>
          <InputLabel>Select a Time Slot:</InputLabel>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {availableSlots[id].map((time, index) => (
              <Button
                key={index}
                variant={selectedAppointments[id]?.time === time ? 'contained' : 'outlined'}
                color="primary"
                onClick={() => handleSlotSelection(time)}
              >
                {time}
              </Button>
            ))}
          </Box>
        </Box>
      )}

      <CardActions>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBookAppointment}
          disabled={!selectedAppointments[id]?.date || !selectedAppointments[id]?.time}
        >
          Book Appointment
        </Button>
      </CardActions>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogContent>
          <Typography variant="body1">{dialogMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DoctorDetails;
