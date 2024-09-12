"use client";
import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import styled from 'styled-components';
import { useAuth } from '@/contexts/AuthContexts';
import { useCart } from '@/contexts/CardContext';
import AddAddressDialog from '@/components/AddAddressDialog';
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

const Account = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false); // State for pop-up
  const [popupMessage, setPopupMessage] = useState(''); // Message for pop-up
  
  const { currentUser, logout } = useAuth();
  const { addresses, addToAddresses } = useCart();
  
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    experience: '',
    fees: ''
  });

  const userDetails = currentUser
    ? {
        uid: currentUser.uid || "",
        email: currentUser.email || "",
        displayName: currentUser.displayName || "",
        photoURL: currentUser.photoURL || "",
      }
    : null;

  // Fetch doctor details from Firestore
  useEffect(() => {
    const fetchDoctorDetails = async () => {
      if (currentUser) {
        const doctorDocRef = doc(db, 'doctors', currentUser.uid);
        const docSnap = await getDoc(doctorDocRef);
        
        if (docSnap.exists()) {
          setIsDoctor(true); // User is a doctor
          setDoctorDetails(docSnap.data());
          setFormData({
            name: docSnap.data().name || '',
            specialization: docSnap.data().specialization || '',
            experience: docSnap.data().experience || '',
            fees: docSnap.data().fees || ''
          });
        }
        setLoading(false);
      }
    };
    
    fetchDoctorDetails();
  }, [currentUser]);

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  const handleAddAddress = (address) => {
    addToAddresses(address);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDoctorUpdate = async () => {
    try {
      const doctorDocRef = doc(db, 'doctors', currentUser.uid);
      await setDoc(doctorDocRef, { ...formData }, { merge: true });
      setPopupMessage('Doctor details updated successfully');
      setPopupOpen(true); // Open success pop-up
    } catch (error) {
      console.error('Error updating doctor details:', error);
      setPopupMessage('Failed to update doctor details');
      setPopupOpen(true); // Open error pop-up
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
        {isDoctor ? 'Doctor Settings' : 'Account Settings'}
      </Typography>

      <StyledPaper elevation={3}>
        {/* Name field */}
        <InfoRow>
          <Box>
            <Typography sx={{ color: 'tertiary.main' }} variant="subtitle1" fontWeight="bold">
              Name
            </Typography>
            {isDoctor ? (
              <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name.startsWith('Dr. ') ? formData.name : `Dr. ${formData.name}`}
              onChange={(e) => setFormData({ ...formData, name: e.target.value.replace(/^Dr\. /, '') })}
              variant="outlined"
              sx={{ marginBottom: '1rem' }}
            />
            ) : (
              <Typography variant="body2">{userDetails?.displayName || ""}</Typography>
            )}
          </Box>
        </InfoRow>

        {/* Email field */}
        <InfoRow>
          <Box>
            <Typography sx={{ color: 'tertiary.main' }} variant="subtitle1" fontWeight="bold">
              Email
            </Typography>
            <Typography variant="body2">{userDetails?.email || ""}</Typography>
          </Box>
        </InfoRow>

        {/* Additional fields for doctors */}
        {isDoctor && (
          <>
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
          </>
        )}

        {/* Address section for users */}
        {!isDoctor && (
          <InfoRow>
            <Box>
              <Typography sx={{ color: 'tertiary.main' }} variant="subtitle1" fontWeight="bold">
                Address
              </Typography>

              {addresses.length > 0 ? (
                addresses.map((address, index) => (
                  <Box sx={{ paddingRight: '15px', display: 'flex', flexDirection: 'column' }} key={index}>
                    <Typography variant="body2">Address {index + 1}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {`${address.fullName}, ${address.mobileNumber}, ${address.flat}, ${address.area}, ${address.landmark}, ${address.city}, ${address.state}, ${address.pincode}, ${address.country}`}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No addresses found.
                </Typography>
              )}
            </Box>
            <Button variant="outlined" sx={{ color: 'tertiary.main', borderColor: 'tertiary.main' }} onClick={handleOpenDialog}>
              Add New
            </Button>
            <AddAddressDialog open={dialogOpen} onClose={handleCloseDialog} addToAddresses={handleAddAddress} />
          </InfoRow>
        )}
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

export default Account;
