'use client'
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { DatePicker, TimePicker } from '@atlaskit/datetime-picker';
import TextField from '@mui/material/TextField';
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
import '@atlaskit/css-reset'; // Required for Atlaskit components

// Generate allowed times at 30-minute intervals from 9 AM to 5 PM
const generateAllowedTimes = () => {
  const allowedTimes = [];
  const startHour = 9;
  const endHour = 16;

  for (let hour = startHour; hour < endHour; hour++) {
    allowedTimes.push(`${hour}:00`); // Minute 0
    allowedTimes.push(`${hour}:30`); // Minute 30
  }

  return allowedTimes.filter(time => time !== "16:30");
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

  const fetchAllDoctors = async () => {
    setLoading(true);
    try {
      const doctorsRef = collection(db, 'doctors');
      const querySnapshot = await getDocs(doctorsRef);

      const results = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setDoctorsList(results);
      setFilteredDoctors(results);

      const uniqueSpecializations = [...new Set(results.map(doctor => doctor.specialization))];
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
    const selectedDate = new Date(newDate); // Convert string to Date object
    
    if (selectedDate.getDay() === 0) { // Check if it's Sunday
      alert("Clinic is not functional on a Sunday");
      return; // Prevent selection
    }
  
    setSelectedDates(prevState => ({
      ...prevState,
      [doctorId]: {
        ...prevState[doctorId],
        date: newDate
      }
    }));
  };

  const handleTimeChange = (doctorId, newTime) => {
    setSelectedDates(prevState => ({
      ...prevState,
      [doctorId]: {
        ...prevState[doctorId],
        time: newTime
      }
    }));
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

  const shouldDisableDate = (date) => {
    return date.getDay() === 0; // Disable Sundays
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
        justifyContent: 'space-between',
        padding: '20px'
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
                  {doctor.name}
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
                  onClick={() => {
                    console.log(`Booking appointment for ${doctor.name} on ${selectedDates[doctor.id]?.date} at ${selectedDates[doctor.id]?.time}`);
                  }}
                >
                  Book Appointment
                </Button>
              </CardActions>
            </Card>
          ))
        )}
      </Box>
    </div>
  );
}