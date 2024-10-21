import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Box, Divider, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useAuth } from '@/contexts/AuthContexts';
import { useRouter } from 'next/navigation';
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

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
  
  const [openDialog, setOpenDialog] = React.useState(false);
  const [isDoctor, setIsDoctor] = React.useState(false);
  const [doctorName, setDoctorName] = React.useState('');

  React.useEffect(() => {
    const checkDoctorStatus = async () => {
      if (currentUser) {
        const doctorDocRef = doc(db, "doctors", currentUser.uid);
        const doctorDoc = await getDoc(doctorDocRef);
        if (doctorDoc.exists()) {
          setIsDoctor(true);
          setDoctorName(`Dr. ${doctorDoc.data().name || currentUser.name || 'No name'}`);
        } else {
          setIsDoctor(false);
        }
      }
    };

    checkDoctorStatus();
  }, [currentUser]);

  const handleLogout = () => {
    setOpenDialog(true); // Open confirmation dialog
  };

  const confirmLogout = async () => {
    setOpenDialog(false); // Close dialog
    await logout(); // Perform logout
    router.push('/'); // Redirect to home page
  };

  const cancelLogout = () => {
    setOpenDialog(false); // Close dialog
  };

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
                alt={isDoctor ? doctorName : userDetails.displayName || 'User'}
                style={{ width: 56, height: 56, borderRadius: '50%' }}
              />
              <Box ml={2}>
                <Typography color="inherit" variant="body1" sx={{ fontWeight: 'bold' }}>
                  {isDoctor ? doctorName : userDetails.displayName || 'No name'}
                </Typography>
                <Typography color="textSecondary" variant="body2" sx={{ fontWeight: 'bold' }}>
                  {userDetails.email || 'No email'}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ my: 1 }} />
            
            {/* Render different options based on whether the user is a doctor */}
            {isDoctor ? (
              <>
                <Typography
                  style={{ cursor: 'pointer', color: 'primary', margin: 8, padding: 5, fontWeight: 'bold' }}
                  variant="body2"
                  onClick={() => router.push('/myorders')}
                >
                  My Orders
                </Typography>
                <Typography
                  style={{ cursor: 'pointer', color: 'primary', margin: 8, padding: 5, fontWeight: 'bold' }}
                  variant="body2"
                  onClick={() => router.push('/AppointmentRequestsPage')}
                >
                  Appointment Management
                </Typography>
                <Typography
                  style={{ cursor: 'pointer', color: 'primary', margin: 8, padding: 5, fontWeight: 'bold' }}
                  variant="body2"
                  onClick={() => router.push('/myaccount')}
                >
                  My Account
                </Typography>
              </>
            ) : (
              <>
                <Typography
                  style={{ cursor: 'pointer', color: 'primary', margin: 8, padding: 5, fontWeight: 'bold' }}
                  variant="body2"
                  onClick={() => router.push('/myorders')}
                >
                  My Orders
                </Typography>
                <Typography
                  style={{ cursor: 'pointer', color: 'primary', margin: 8, padding: 5, fontWeight: 'bold' }}
                  variant="body2"
                  onClick={() => router.push('/MyAppointmentsPage')}
                >
                  My Appointments
                </Typography>
                <Typography
                  style={{ cursor: 'pointer', color: 'primary', margin: 8, padding: 5, fontWeight: 'bold' }}
                  variant="body2"
                  onClick={() => router.push('/myaccount')}
                >
                  My Account
                </Typography>
              </>
            )}

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
      <Dialog open={openDialog} onClose={cancelLogout}>
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
