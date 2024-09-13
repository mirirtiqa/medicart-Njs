"use client";
import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Paper, Box, Button, TextField,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Checkbox, FormControlLabel
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useAuth } from '@/contexts/AuthContexts';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const StyledPaper = styled(Paper)`
  padding: 1.5rem;
  margin-top: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const InfoRow = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: start;
  padding: 0.75rem 0;
  border-bottom: 1px solid #ddd;
`;

const DoctorAccount = () => {
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    experience: '',
    fees: ''
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectAll, setSelectAll] = useState(false); // State for Select All checkbox
  const { currentUser } = useAuth();

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
  ];

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      if (currentUser) {
        const doctorDocRef = doc(db, 'doctors', currentUser.uid);
        const docSnap = await getDoc(doctorDocRef);

        if (docSnap.exists()) {
          setFormData(docSnap.data());
        }
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDoctorUpdate = async () => {
    try {
      const doctorDocRef = doc(db, 'doctors', currentUser.uid);
      await setDoc(doctorDocRef, { ...formData }, { merge: true });
      setPopupMessage('Doctor details updated successfully');
      setPopupOpen(true);
    } catch (error) {
      console.error('Error updating doctor details:', error);
      setPopupMessage('Failed to update doctor details');
      setPopupOpen(true);
    }
  };

  const handleDateChange = (newDate) => {
    if (newDate && dayjs(newDate).day() !== 0) {
      setSelectedDate(newDate);
    } else {
      setPopupMessage("You can't select Sundays");
      setPopupOpen(true);
    }
  };

  const handleTimeSlotChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setAvailableTimeSlots([...availableTimeSlots, value]);
    } else {
      setAvailableTimeSlots(availableTimeSlots.filter((slot) => slot !== value));
    }
  };

  const handleSelectAll = (event) => {
    const checked = event.target.checked;
    setSelectAll(checked);
    if (checked) {
      setAvailableTimeSlots(timeSlots); // Select all time slots
    } else {
      setAvailableTimeSlots([]); // Deselect all time slots
    }
  };

  const handleAvailabilityUpdate = async () => {
    if (!selectedDate || availableTimeSlots.length === 0) {
      setPopupMessage('Please select a date and at least one time slot.');
      setPopupOpen(true);
      return;
    }

    try {
      const doctorDocRef = doc(db, 'doctors', currentUser.uid);
      await setDoc(
        doctorDocRef,
        {
          availability: {
            [selectedDate.format('YYYY-MM-DD')]: availableTimeSlots
          }
        },
        { merge: true }
      );
      setPopupMessage('Availability updated successfully');
      setPopupOpen(true);
    } catch (error) {
      console.error('Error updating availability:', error);
      setPopupMessage('Failed to update availability');
      setPopupOpen(true);
    }
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="md" sx={{ marginTop: '3rem' }}>
        <Typography variant="h4" gutterBottom>
          Doctor Settings
        </Typography>

        <StyledPaper elevation={3}>
          {/* Doctor Information Fields */}
          <InfoRow>
            <Box>
              <Typography sx={{ color: 'tertiary.main' }} variant="subtitle1" fontWeight="bold">
                Name
              </Typography>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name.startsWith('Dr. ') ? formData.name : `Dr. ${formData.name}`}
                onChange={(e) => setFormData({ ...formData, name: e.target.value.replace(/^Dr\. /, '') })}
                variant="outlined"
                sx={{ marginBottom: '1rem' }}
              />
            </Box>
          </InfoRow>

          <InfoRow>
            <Box>
              <Typography sx={{ color: 'tertiary.main' }} variant="subtitle1" fontWeight="bold">
                Specialization
              </Typography>
              <TextField
                fullWidth
                label="Specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                variant="outlined"
              />
            </Box>
          </InfoRow>

          <InfoRow>
            <Box>
              <Typography sx={{ color: 'tertiary.main' }} variant="subtitle1" fontWeight="bold">
                Experience
              </Typography>
              <TextField
                fullWidth
                label="Experience (years)"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                variant="outlined"
              />
            </Box>
          </InfoRow>

          <InfoRow>
            <Box>
              <Typography sx={{ color: 'tertiary.main' }} variant="subtitle1" fontWeight="bold">
                Fees
              </Typography>
              <TextField
                fullWidth
                label="Fees"
                name="fees"
                value={formData.fees}
                onChange={handleChange}
                variant="outlined"
              />
            </Box>
          </InfoRow>

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, backgroundColor: 'tertiary.main', color: 'secondary.main' }}
            onClick={handleDoctorUpdate}
          >
            Update Doctor Details
          </Button>
        </StyledPaper>

        {/* Availability Section */}
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Set Available Dates & Time Slots
        </Typography>

        {/* Date Picker */}
        <StyledPaper elevation={3} sx={{ mt: 2 }}>
          <DatePicker
            label="Select Available Date"
            value={selectedDate}
            onChange={handleDateChange}
            disablePast
            shouldDisableDate={(date) => dayjs(date).day() === 0} // Disable Sundays
          />

          {/* "Select All" Checkbox */}
          <Box sx={{ mt: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              }
              label="Select All Time Slots"
            />
          </Box>

          {/* Time Slot Selection */}
          <Box sx={{ mt: 2 }}>
            {timeSlots.map((slot) => (
              <FormControlLabel
                key={slot}
                control={
                  <Checkbox
                    checked={availableTimeSlots.includes(slot)}
                    onChange={handleTimeSlotChange}
                    value={slot}
                  />
                }
                label={slot}
              />
            ))}
          </Box>

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, backgroundColor: 'tertiary.main', color: 'secondary.main' }}
            onClick={handleAvailabilityUpdate}
          >
            Update Availability
          </Button>
        </StyledPaper>

        {/* Pop-up dialog for success/error messages */}
        <Dialog
          open={popupOpen}
          onClose={handlePopupClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Update Status"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {popupMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handlePopupClose} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </LocalizationProvider>
  );
};

export default DoctorAccount;
