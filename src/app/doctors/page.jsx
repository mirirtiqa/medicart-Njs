'use client';
import { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc, setDoc, query, where } from 'firebase/firestore';
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

export default function DoctorsPage() {
  const [doctorsList, setDoctorsList] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [specialization, setSpecialization] = useState('');
  const [specializations, setSpecializations] = useState([]);
  const [selectedAppointments, setSelectedAppointments] = useState({});
  const [availableSlots, setAvailableSlots] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [expandedDoctorId, setExpandedDoctorId] = useState(null);
  const { currentUser } = useAuth();
  const [isDoctor, setIsDoctor] = useState(false);

  const fetchAllDoctors = async () => {
    setLoading(true);
    try {
      const doctorsRef = collection(db, 'doctors');
      const querySnapshot = await getDocs(doctorsRef);

      const results = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const filteredResults = results.filter((doctor) =>
        doctor.name && doctor.specialization && doctor.experience && doctor.fees
      );

      setDoctorsList(filteredResults);
      setFilteredDoctors(filteredResults);

      const uniqueSpecializations = [...new Set(filteredResults.map((doctor) => doctor.specialization))];
      setSpecializations(uniqueSpecializations);
      if (currentUser) {
        const userDocRef = doc(db, 'doctors', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setIsDoctor(true);
        }}
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllDoctors();
  }, []);

  const handleSpecializationChange = (event) => {
    const selectedSpecialization = event.target.value;
    setSpecialization(selectedSpecialization);

    if (selectedSpecialization === '') {
      setFilteredDoctors(doctorsList);
    } else {
      const filtered = doctorsList.filter((doctor) => doctor.specialization === selectedSpecialization);
      setFilteredDoctors(filtered);
    }
  };

  const fetchAvailableSlots = async (doctorId, date) => {
    try {
      const doctorRef = doc(db, 'doctors', doctorId);
      const doctorSnap = await getDoc(doctorRef);

      if (doctorSnap.exists()) {
        const doctorData = doctorSnap.data();
        const availability = doctorData.availability || {};

        // Fetch accepted appointments for the doctor and the selected date
        const appointmentsRef = collection(db, 'appointments');
        const q = query(
          appointmentsRef,
          where('doctorId', '==', doctorId),
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
            [doctorId]: availableTimes,
          }));
        } else {
          setAvailableSlots((prev) => ({
            ...prev,
            [doctorId]: [], // Clear slots for past dates
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching available slots:', error);
    }
  };

  const handleDateSelection = (doctorId, date) => {
    if (selectedAppointments[doctorId]?.date === date) {
      setSelectedAppointments((prevState) => ({
        ...prevState,
        [doctorId]: { ...prevState[doctorId], date: undefined, time: undefined },
      }));
      setAvailableSlots((prevState) => ({
        ...prevState,
        [doctorId]: [],
      }));
      setExpandedDoctorId(null);
    } else {
      fetchAvailableSlots(doctorId, date);
      setSelectedAppointments((prevState) => ({
        ...prevState,
        [doctorId]: { ...prevState[doctorId], date },
      }));
      setExpandedDoctorId(doctorId);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // This formats the date to DD/MM/YYYY
  };

  const handleSlotSelection = (doctorId, time) => {
    setSelectedAppointments((prevState) => ({
      ...prevState,
      [doctorId]: {
        ...prevState[doctorId],
        time: prevState[doctorId]?.time === time ? undefined : time, // Deselect if clicked again
      },
    }));
  };

  const handleBookAppointment = async (doctor) => {
    // Check if the logged-in user is a doctor
    if (isDoctor) {
      setDialogMessage('Doctors cannot book appointments.');
      setOpenDialog(true);
      return;
    }
  
    const selectedAppointment = selectedAppointments[doctor.id];
  
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
      const appointmentId = `${currentUser.uid}_${doctor.id}_${date}_${time}`;
      const appointmentRef = doc(db, 'appointments', appointmentId);
  
      const patientsName = currentUser.displayName || 'Unknown Patient';
      const patientsEmail = currentUser.email || 'Unknown Email';
      const doctorName = `Dr. ${doctor.name || 'Unknown Doctor'}`;
  
      await setDoc(appointmentRef, {
        userId: currentUser.uid,
        doctorId: doctor.id,
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

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography fontWeight={'bold'} variant="h4" sx={{ padding: '25px' }}>
          Available Doctors
        </Typography>
        <CustomFormControl variant="outlined" sx={{ width: '25%' }}>
          <InputLabel sx={{ padding: '15px' }}>Filter by Specialization</InputLabel>
          <Select
            value={specialization}
            onChange={handleSpecializationChange}
            input={<OutlinedInput label="Filter by Specialization" />}
          >
            <MenuItem value="">All Specializations</MenuItem>
            {specializations.map((spec, index) => (
              <MenuItem key={index} value={spec}>
                {spec}
              </MenuItem>
            ))}
          </Select>
        </CustomFormControl>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', gap: '4rem', padding: '3rem' }}>
        {filteredDoctors.length === 0 ? (
          <Typography variant="h6">No doctors available.</Typography>
        ) : (
          filteredDoctors.map((doctor) => (
            <Card
              key={doctor.id}
              sx={{
                width: expandedDoctorId === doctor.id ? '40%' : '30%',
                marginBottom: '20px',
                border: '2px solid black',
                borderRadius: '10px',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease, max-height 0.3s ease', // Smooth transition
                transform: expandedDoctorId === doctor.id ? 'scale(1.05)' : 'scale(1)', // Scaling effect on expansion
                maxHeight: expandedDoctorId === doctor.id ? '1000px' : '400px', // Expand smoothly on click
                overflow: 'hidden',
              }}
            >
              <CardContent>
                <Typography variant="h5" fontWeight={'bold'} gutterBottom>
                  Dr. {doctor.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Specialization: {doctor.specialization}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Experience: {doctor.experience} years
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Fees: ₹{doctor.fees}
                </Typography>

                <Box sx={{ marginTop: '20px' }}>
                  <InputLabel sx={{ marginBottom: '10px' }}>Select a Date:</InputLabel>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {doctor.availability
                      ? Object.keys(doctor.availability)
                        .sort((a, b) => new Date(a) - new Date(b)) // Sort dates in ascending order
                        .filter(date => new Date(date) >= new Date()) // Filter out past dates
                        .map((date) => (
                          <Button
                            key={date}
                            variant={selectedAppointments[doctor.id]?.date === date ? 'contained' : 'outlined'}
                            sx={{ margin: '0.5rem', textTransform: 'none' }}
                            onClick={() => handleDateSelection(doctor.id, date)}
                          >
                            {formatDate(date)} {/* Format the date here */}
                          </Button>
                        ))
                      : 'No availability'}
                  </Box>
                </Box>

                {expandedDoctorId === doctor.id && availableSlots[doctor.id] && availableSlots[doctor.id].length > 0 && (
                  <Box sx={{ marginTop: '20px' }}>
                    <InputLabel sx={{ marginBottom: '10px' }}>Select a Time Slot:</InputLabel>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {availableSlots[doctor.id].map((time, index) => (
                        <Button
                          key={index}
                          variant={selectedAppointments[doctor.id]?.time === time ? 'contained' : 'outlined'}
                          color="primary"
                          onClick={() => handleSlotSelection(doctor.id, time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </Box>
                  </Box>
                )}
              </CardContent>

              <CardActions>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: '#01D6A3',
                    '&:hover': { bgcolor: 'white', color: '#01D6A3' },
                  }}
                  onClick={() => handleBookAppointment(doctor)}
                >
                  Book Appointment
                </Button>
              </CardActions>
            </Card>
          ))
        )}
      </Box>

      {/* Dialog for booking messages */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogContent>{dialogMessage}</DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
