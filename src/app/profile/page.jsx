"use client";
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContexts';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const { currentUser, logout } = useAuth();
  const [openProfile, setOpenProfile] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  const userDetails = currentUser
    ? {
        uid: currentUser.uid || "",
        email: currentUser.email || "",
        displayName: currentUser.displayName || "",
        photoURL: currentUser.photoURL || "",
      }
    : null;

  const handleOpenProfile = () => {
    setOpenProfile(true);
  };

  const handleCloseProfile = () => {
    setOpenProfile(false);
  };

  const handleOpenLogout = () => {
    setOpenLogout(true);
  };

  const handleCloseLogout = () => {
    setOpenLogout(false);
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    await logout();
    router.push('/');
  };

  if (loggingOut) {
    return null;
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
      <Button 
        variant="contained" 
        sx={{ backgroundColor: '#01D6A3', color: '#fff' }} 
        onClick={handleOpenProfile}
      >
        View Profile
      </Button>

      {/* Profile Dialog */}
      <Dialog
        open={openProfile}
        onClose={handleCloseProfile}
        aria-labelledby="profile-dialog-title"
        aria-describedby="profile-dialog-description"
      >
        <DialogTitle id="profile-dialog-title">Profile</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: 2,
            }}
          >
            <img 
              src={userDetails?.photoURL} 
              alt={`${userDetails?.displayName}'s profile picture`} 
              style={{ width: '150px', borderRadius: '50%' }} 
            />
            <Typography variant="h6"><strong>Name:</strong> {userDetails?.displayName}</Typography>
            <Typography variant="h6"><strong>Email:</strong> {userDetails?.email}</Typography>
            <Typography variant="h6"><strong>User ID:</strong> {userDetails?.uid}</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProfile} sx={{ color: '#01D6A3' }}>
            Close
          </Button>
          <Button onClick={handleOpenLogout} sx={{ color: '#01D6A3' }}>
            Logout
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog
        open={openLogout}
        onClose={handleCloseLogout}
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
          <Button onClick={handleCloseLogout} sx={{ color: '#01D6A3' }}>
            Cancel
          </Button>
          <Button onClick={handleLogout} sx={{ color: '#01D6A3' }} autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
