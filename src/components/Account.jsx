"use client"
import React, { useState } from 'react';
import { Container, Typography, Paper, Grid, Button, Box } from '@mui/material';
import styled from 'styled-components';
import EditIcon from '@mui/icons-material/Edit';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useAuth } from '@/contexts/AuthContexts';
import { useCart } from '@/contexts/CardContext'
import AddAddressDialog from '@/components/AddAddressDialog';
import Link from 'next/link';


const StyledPaper = styled(Paper)`
  padding: 1.5rem;
  margin-top: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const InfoRow = styled(Box)`
  display: flex;
//   flex-direction:column;
  justify-content: space-between;
  align-items: start;
  padding: 0.75rem 0;
  border-bottom: 1px solid #ddd;
`;

const Account = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const { currentUser, logout } = useAuth();
    const {addresses, addToAddresses} = useCart();


    const userDetails = currentUser
    ? {
        uid: currentUser.uid || "",
        email: currentUser.email || "",
        displayName: currentUser.displayName || "",
        photoURL: currentUser.photoURL || "",
      }
    : null;
    
    const handleOpenDialog = () => {
        setDialogOpen(true);
      };
    
      const handleCloseDialog = () => {
        setDialogOpen(false);
      };
    
      const handleAddAddress = (address) => {
        console.log('Address added:', address);
        addToAddresses(address)
      };

  return (
    <Container maxWidth="md" sx={{marginTop:'3rem'}}>
      <Typography variant="h4" gutterBottom>
        Account Settings
      </Typography>
      <StyledPaper elevation={3}>
        <InfoRow>
          <Box>
            <Typography sx={{ color: 'tertiary.main'}} variant="subtitle1" fontWeight="bold">Name</Typography>
            <Typography variant="body2">{userDetails?.displayName || ""}</Typography>
          </Box>
          <Button variant="outlined" sx={{color:'tertiary.main', borderColor:"tertiary.main"}} startIcon={<EditIcon />}>Edit</Button>
        </InfoRow>

        <InfoRow>
          <Box>
            <Typography sx={{ color: 'tertiary.main'}} variant="subtitle1" fontWeight="bold">Email</Typography>
            <Typography variant="body2">{userDetails?.email || ""}</Typography>
          </Box>
          <Button variant="outlined" sx={{color:'tertiary.main', borderColor:"tertiary.main"}} startIcon={<EditIcon />}>Edit</Button>
        </InfoRow>

        <InfoRow>
          <Box>
          <Typography sx={{ color: 'tertiary.main'}} variant="subtitle1" fontWeight="bold">Address</Typography>

{addresses.length > 0 ? (
        addresses.map((address,index) => (

            <Box sx ={{paddingRight:'15px',display:'flex',flexDirection:'column'}}> 
            <Typography variant="body2">Address {index + 1}</Typography>
            <Typography variant="caption" color="textSecondary">
                {address}
            </Typography>
            <Typography variant="caption" color="tertiary.main">
            <Link href="#">Edit</Link>
            </Typography>
            
            </Box>
        ))
      ) : (
        <Typography variant="body2" color="textSecondary">
          No addresses found.
        </Typography>
      )}
            
          </Box>
          <Button variant="outlined" sx={{color:'tertiary.main', borderColor:"tertiary.main"}} onClick={handleOpenDialog} startIcon={<EditIcon />}>Add New</Button>
          <AddAddressDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        addToAddresses={handleAddAddress}
      />
        </InfoRow>

      

       

       
      </StyledPaper>
    </Container>
  );
};

export default Account;
