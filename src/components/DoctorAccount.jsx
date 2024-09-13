"use client";
import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import styled from 'styled-components';
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

  const { currentUser } = useAuth();

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

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: '3rem' }}>
      <Typography variant="h4" gutterBottom>
        Doctor Settings
      </Typography>

      <StyledPaper elevation={3}>
        {/* Name field */}
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

        {/* Specialization field */}
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

        {/* Experience field */}
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

        {/* Fees field */}
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
  );
};

export default DoctorAccount;
