"use client";
import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
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
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [editField, setEditField] = useState(null);
  const [editValue, setEditValue] = useState('');

  const { currentUser } = useAuth();
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

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  const handleOpenEditDialog = (field) => {
    setEditField(field);
    setEditValue(userDetails[field] || '');
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => setEditDialogOpen(false);

  const handleAddAddress = (address) => {
    addToAddresses(address);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async () => {
    const userDocRef = doc(db, 'users', currentUser.uid);
    try {
      await setDoc(userDocRef, { [editField]: editValue }, { merge: true });
      setPopupMessage(`${editField.charAt(0).toUpperCase() + editField.slice(1)} updated successfully`);
      setPopupOpen(true);
      setEditDialogOpen(false);
    } catch (error) {
      console.error('Error updating user details:', error);
      setPopupMessage('Failed to update user details');
      setPopupOpen(true);
    }
  };

  const handleEditValueChange = (e) => {
    setEditValue(e.target.value);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: '3rem' }}>
      <Typography variant="h4" gutterBottom>
        Account Settings
      </Typography>

      <StyledPaper elevation={3}>
        {/* Name field */}
        <InfoRow>
          <Box>
            <Typography sx={{ color: 'tertiary.main' }} variant="subtitle1" fontWeight="bold">
              Name
            </Typography>
            <Box display="flex" alignItems="center">
              <Typography variant="body2">{userDetails?.displayName || ""}</Typography>
              <IconButton onClick={() => handleOpenEditDialog('displayName')} sx={{ marginLeft: '1rem' }}>
                <EditIcon />
              </IconButton>
            </Box>
          </Box>
        </InfoRow>

        {/* Email field */}
        <InfoRow>
          <Box>
            <Typography sx={{ color: 'tertiary.main' }} variant="subtitle1" fontWeight="bold">
              Email
            </Typography>
            <Box display="flex" alignItems="center">
              <Typography variant="body2">{userDetails?.email || ""}</Typography>
              <IconButton onClick={() => handleOpenEditDialog('email')} sx={{ marginLeft: '1rem' }}>
                <EditIcon />
              </IconButton>
            </Box>
          </Box>
        </InfoRow>

        {/* Address section */}
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
      </StyledPaper>

      {/* Pop-up dialog for success/error messages */}
      <Dialog
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
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
          <Button onClick={() => setPopupOpen(false)} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for editing user details */}
      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit {editField === 'displayName' ? 'Name' : 'Email'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label={editField === 'displayName' ? 'Name' : 'Email'}
            value={editValue}
            onChange={handleEditValueChange}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Account;
