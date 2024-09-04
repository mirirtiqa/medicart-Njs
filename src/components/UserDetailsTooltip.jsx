import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Box, Divider, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useAuth } from '@/contexts/AuthContexts';
import { useRouter } from 'next/navigation';

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#fff',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 300,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    padding: theme.spacing(2),
  },
}));

export default function UserDetailsTooltip({ children }) {
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  
  // State for controlling the dialog
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleLogout = () => {
    setOpenDialog(true); // Open confirmation dialog
  };

  const confirmLogout = async () => {
    setOpenDialog(false); // Close dialog
    await logout(); // Perform logout
    router.push('/'); // Redirect to home page
    window.location.reload(); // Refresh the page
  };

  const cancelLogout = () => {
    setOpenDialog(false); // Close dialog
  };

  // Define userDetails using currentUser
  const userDetails = currentUser
    ? {
        email: currentUser.email || "",
        displayName: currentUser.displayName || "",
        photoURL: currentUser.photoURL || "",
      }
    : { email: "", displayName: "", photoURL: "" };

  return (
    <div>
      <HtmlTooltip
        title={
          <React.Fragment>
            <Box display="flex" alignItems="center" mb={1}>
              <img
                src={userDetails.photoURL || '/default-avatar.png'}
                alt={userDetails.displayName || 'User'}
                style={{ width: 56, height: 56, borderRadius: '50%' }}
              />
              <Box ml={2}>
                <Typography color="inherit" variant="body1" sx={{ fontWeight: 'bold' }}>
                  {userDetails.displayName || 'No name'}
                </Typography>
                <Typography color="textSecondary" variant="body2" sx={{ fontWeight: 'bold' }}>
                  {userDetails.email || 'No email'}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Typography
              style={{ cursor: 'pointer', color: 'primary', margin: 8, padding: 5, fontWeight: 'bold' }}
              variant="body2"
              onClick={() => router.push('/orders')}
            >
              My Orders
            </Typography>
            <Typography
              style={{ cursor: 'pointer', color: 'primary', margin: 8, padding: 5, fontWeight: 'bold' }}
              variant="body2"
              onClick={() => router.push('/appointments')}
            >
              My Appointments
            </Typography>
            <Button
              fullWidth
              style={{ marginTop: 8, backgroundColor: '#01D6A3', color: 'white' }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </React.Fragment>
        }
      >
        {children}
      </HtmlTooltip>

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={cancelLogout}
      >
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to logout?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelLogout} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmLogout} style={{ color: '#01D6A3' }}>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
