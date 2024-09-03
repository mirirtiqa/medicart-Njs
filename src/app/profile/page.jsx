"use client";
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContexts';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const { currentUser, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false); // State to track if the user is logging out
  const router = useRouter();

  const userDetails = currentUser
    ? {
        uid: currentUser.uid || "",
        email: currentUser.email || "",
        displayName: currentUser.displayName || "",
        photoURL: currentUser.photoURL || "",
      }
    : null;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    setLoggingOut(true); // Set loggingOut to true
    await logout(); // Wait for the logout to complete
    router.push('/'); // Redirect to the home page
  };

  if (!userDetails || loggingOut) {
    return null; // Do not render anything while logging out
  }

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        gap: 2,
      }}
    >
      <Typography variant="h4">Profile Details</Typography>
      <img 
        src={userDetails.photoURL} 
        alt={`${userDetails.displayName}'s profile picture`} 
        style={{ width: '150px', borderRadius: '50%' }} 
      />
      <Typography variant="h6"><strong>Name:</strong> {userDetails.displayName}</Typography>
      <Typography variant="h6"><strong>Email:</strong> {userDetails.email}</Typography>
      <Typography variant="h6"><strong>User ID:</strong> {userDetails.uid}</Typography>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Logout
      </Button>

      {/* Confirmation Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Logout"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="primary" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
