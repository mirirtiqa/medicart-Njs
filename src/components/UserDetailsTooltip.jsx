import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Menu, MenuItem,Box } from '@mui/material';
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



export default function UserDetailsTooltip({children,useremail}) {
  const router = useRouter(); 
  function handleProfileClick(){
    router.push('/profile')
  }



  return (
    <div>
      <HtmlTooltip
        title={
          <React.Fragment>
            <Typography color="inherit">Hello, {useremail}</Typography>
            <Box mt={1}>
              <Typography 
                onClick={handleProfileClick} 
                style={{ cursor: 'pointer' }}
                variant="body2"
              >
                Profile
              </Typography>
              <Typography 
                onClick={() => console.log('Settings clicked')} 
                style={{ cursor: 'pointer'}}
                variant="body2"
              >
                Settings
              </Typography>
            </Box>
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
          <Button onClick={confirmLogout} style={{color: '#01D6A3'}}>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
