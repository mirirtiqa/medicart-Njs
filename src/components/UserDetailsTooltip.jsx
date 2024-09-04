import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Menu, MenuItem,Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContexts';


const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));



export default function UserDetailsTooltip({children,useremail}) {
  const router = useRouter(); 
  const { currentUser} = useAuth();
  const userDetails = 
    {
        email: currentUser.email || "",
        displayName: currentUser.displayName || "User",
        photoURL: currentUser.photoURL || "",
      }

  function handleProfileClick(){
    router.push('/profile')
  }



  return (
    <div>
      <HtmlTooltip
        title={
          <React.Fragment>
            <Typography color="inherit">Hello, {userDetails.displayName}</Typography>
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
    </div>
  );
}
