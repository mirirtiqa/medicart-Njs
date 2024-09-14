'use client';
import { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
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
import '@atlaskit/css-reset'; // Required for Atlaskit components
import { useAuth } from '@/contexts/AuthContexts'; // Adjust the import based on your actual auth context path
import { setDoc } from 'firebase/firestore';

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
  }
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
  const { currentUser } = useAuth();

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

  // Fetch available slots based on the selected date from the 'availability' map
  const fetchAvailableSlots = async (doctorId, date) => {
    try {
      const doctorRef = doc(db, 'doctors', doctorId);
      const doctorSnap = await getDoc(doctorRef);

      if (doctorSnap.exists()) {
        const doctorData = doctorSnap.data();
        const availability = doctorData.availability || {};

        setAvailableSlots((prev) => ({
          ...prev,
          [doctorId]: availability[date] || [],
        }));
      }
    } catch (error) {
      console.error('Error fetching available slots:', error);
    }
  };

  const handleDateSelection = (doctorId, date) => {
    fetchAvailableSlots(doctorId, date);
    setSelectedAppointments((prevState) => ({
      ...prevState,
      [doctorId]: { ...prevState[doctorId], date },
    }));
  };

  const handleSlotSelection = (doctorId, time) => {
    setSelectedAppointments((prevState) => ({
      ...prevState,
      [doctorId]: { ...prevState[doctorId], time },
    }));
  };

  const handleBookAppointment = async (doctor) => {
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
      const appointmentId = `${currentUser.uid}_${doctor.id}_${date}`;
      const appointmentRef = doc(db, 'appointments', appointmentId);

      await setDoc(appointmentRef, {
        userId: currentUser.uid,
        doctorId: doctor.id,
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
        <Typography fontWeight={'bold'} variant="h4" sx={{ padding: '25px' }}>Available Doctors</Typography>
        <CustomFormControl variant="outlined" sx={{ width: '25%' }}>
          <InputLabel sx={{ padding: '15px' }}>Filter by Specialization</InputLabel>
          <Select
            value={specialization}
            onChange={handleSpecializationChange}
            input={<OutlinedInput label="Filter by Specialization" />}
          >
            <MenuItem value="">All Specializations</MenuItem>
            {specializations.map((spec, index) => (
              <MenuItem key={index} value={spec}>{spec}</MenuItem>
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
                width: '30%',
                marginBottom: '20px',
                border: '2px solid black',
                borderRadius: '10px',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',
                padding: '10px',
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div" fontWeight={'500'} sx={{ padding: '0.5rem' }}>
                  {doctor.name.startsWith('Dr. ') ? doctor.name : `Dr. ${doctor.name}`}
                </Typography>
                <Typography sx={{ padding: '0.5rem' }}>Specialization: {doctor.specialization}</Typography>
                <Typography sx={{ padding: '0.5rem' }}>Experience: {doctor.experience} years</Typography>
                <Typography sx={{ padding: '0.5rem' }}>Fees: ₹{doctor.fees}</Typography>

                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="subtitle1">Available Dates:</Typography>
                  {doctor.availability && Object.keys(doctor.availability).length > 0 ? (
                    Object.keys(doctor.availability).map((date, index) => (
                      <Button
                        key={index}
                        variant={selectedAppointments[doctor.id]?.date === date ? 'contained' : 'outlined'}
                        sx={{ margin: '0.5rem', textTransform: 'none' }}
                        onClick={() => handleDateSelection(doctor.id, date)}
                      >
                        {date}
                      </Button>
                    ))
                  ) : (
                    <Typography>No available dates.</Typography>
                  )}
                </Box>

                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="subtitle1">Available Time Slots:</Typography>
                  {availableSlots[doctor.id]?.length > 0 ? (
                    availableSlots[doctor.id].map((time, index) => (
                      <Button
                        key={index}
                        variant={selectedAppointments[doctor.id]?.time === time ? 'contained' : 'outlined'}
                        sx={{ margin: '0.5rem', textTransform: 'none' }}
                        onClick={() => handleSlotSelection(doctor.id, time)}
                      >
                        {time}
                      </Button>
                    ))
                  ) : (
                    <Typography>Select a date to see available slots.</Typography>
                  )}
                </Box>
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

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogContent>
          <Typography>{dialogMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

