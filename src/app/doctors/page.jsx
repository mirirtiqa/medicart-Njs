'use client';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { DatePicker, TimePicker } from '@atlaskit/datetime-picker';
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
import { doc, setDoc } from 'firebase/firestore';

// Generate allowed times at 30-minute intervals from 9 AM to 5 PM (excluding 6 PM)
const generateAllowedTimes = () => {
  const allowedTimes = [];
  const startHour = 9;
  const endHour = 17; // Update end hour to exclude 6 PM

  for (let hour = startHour; hour < endHour; hour++) {
    allowedTimes.push(`${hour}:00`); // Minute 0
    allowedTimes.push(`${hour}:30`); // Minute 30
  }

  return allowedTimes;
};

const allowedTimes = generateAllowedTimes();

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
  const [selectedDates, setSelectedDates] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const { currentUser, isDoctor } = useAuth(); // Use your authentication context to get user and role

  // Debugging: Log user and isDoctor to ensure they are set correctly
  useEffect(() => {
    console.log('User:', currentUser);
    console.log('Is Doctor:', isDoctor);
  }, [currentUser, isDoctor]);

  const fetchAllDoctors = async () => {
    setLoading(true);
    try {
      const doctorsRef = collection(db, 'doctors');
      const querySnapshot = await getDocs(doctorsRef);

      const results = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      // Filter doctors with complete profiles
      const filteredResults = results.filter(doctor =>
        doctor.name &&
        doctor.specialization &&
        doctor.experience &&
        doctor.fees
      );

      setDoctorsList(filteredResults);
      setFilteredDoctors(filteredResults);

      const uniqueSpecializations = [...new Set(filteredResults.map(doctor => doctor.specialization))];
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

  const handleDateChange = (doctorId, newDate) => {
    if (newDate instanceof Date && !isNaN(newDate.getTime())) {
      const dateObject = new Date(newDate); // Ensure it's a valid Date object

      if (dateObject.getDay() === 0) { // Check if it's Sunday
        setDialogMessage("Clinic is not functional on a Sunday");
        setOpenDialog(true);
        return; // Prevent selection
      }

      setSelectedDates(prevState => ({
        ...prevState,
        [doctorId]: {
          ...prevState[doctorId],
          date: dateObject
        }
      }));
    }
  };

  const handleTimeChange = (doctorId, newTime) => {
    if (newTime) {
      setSelectedDates(prevState => ({
        ...prevState,
        [doctorId]: {
          ...prevState[doctorId],
          time: newTime
        }
      }));
    }
  };

  const handleSpecializationChange = (event) => {
    const selectedSpecialization = event.target.value;
    setSpecialization(selectedSpecialization);

    if (selectedSpecialization === '') {
      setFilteredDoctors(doctorsList);
    } else {
      const filtered = doctorsList.filter(doctor => doctor.specialization === selectedSpecialization);
      setFilteredDoctors(filtered);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleBookAppointment = async (doctor) => {
  if (!currentUser) {
    setDialogMessage('Please log in to book an appointment.');
    setOpenDialog(true);
    return;
  }

  // Ensure date and time are both selected
  const selectedDate = selectedDates[doctor.id]?.date;
  const selectedTime = selectedDates[doctor.id]?.time;
  if (!selectedDate || !selectedTime) {
    setDialogMessage('Please select both date and time.');
    setOpenDialog(true);
    return;
  }

  try {
    // Create appointment request
    const appointmentId = `${currentUser.uid}_${doctor.id}_${selectedDate.toISOString()}`;
    const appointmentRef = doc(db, 'appointments', appointmentId);

    await setDoc(appointmentRef, {
      userId: currentUser.uid,
      doctorId: doctor.id,
      date: selectedDate,
      time: selectedTime,
      status: 'Pending' // or 'Requested'
    });

    // Optionally, you can also update the doctor's appointment requests here
    // const doctorAppointmentsRef = doc(db, 'doctors', doctor.id, 'appointmentRequests', currentUser.uid);
    // await setDoc(doctorAppointmentsRef, { ... });

    setDialogMessage('Appointment request sent successfully.');
    setOpenDialog(true);
  } catch (error) {
    console.error('Error booking appointment:', error);
    setDialogMessage('Failed to book appointment.');
    setOpenDialog(true);
  }
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

      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',  // Distribute space evenly between cards
        gap: '4rem',                      // Space between the cards (optional for small gaps)
        padding: '3rem'
      }}>
        {filteredDoctors.length === 0 ? (
          <Typography variant="h6">No doctors available.</Typography>
        ) : (
          filteredDoctors.map(doctor => (
            <Card
              key={doctor.id}
              sx={{
                width: '30%',
                marginBottom: '20px',
                border: '2px solid black',
                borderRadius: '10px',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                padding: '10px',
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div" fontWeight={'500'} sx={{ padding: '0.5rem' }}>
                  {doctor.name.startsWith('Dr. ') ? doctor.name : `Dr. ${doctor.name}`}
                </Typography>
                <Typography sx={{ padding: '0.5rem' }}>
                  Specialization: {doctor.specialization}
                </Typography>
                <Typography sx={{ padding: '0.5rem' }}>
                  Experience: {doctor.experience} years
                </Typography>
                <Typography sx={{ padding: '0.5rem' }}>
                  Fees: ₹{doctor.fees}
                </Typography>
                <Box sx={{ marginTop: 2 }}>
                  <DatePicker
                    onChange={(newDate) => handleDateChange(doctor.id, newDate)}
                    value={selectedDates[doctor.id]?.date || null}
                    placeholder="Select Date"
                    popperPlacement="bottom-start"
                    dateFormat="DD/MM/YYYY"
                  />
                  <TimePicker
                    onChange={(newTime) => handleTimeChange(doctor.id, newTime)}
                    value={selectedDates[doctor.id]?.time || null}
                    placeholder="Select Time"
                    popperPlacement="bottom-start"
                  />
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: '#01D6A3',
                    '&:hover': { bgcolor: 'white', color: '#01D6A3' }
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

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
      >
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