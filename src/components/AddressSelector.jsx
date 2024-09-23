"use client"
import React, { useState } from 'react';
import { Paper, RadioGroup, Radio, FormControlLabel, Button, Link, TextField, Box, Typography } from '@mui/material';
import { useCart } from '@/contexts/CardContext'
import AddAddressDialog from '@/components/AddAddressDialog';
const AddressSelector = ( {addOrderDetails}) => {
    const {addresses, addToAddresses} = useCart();

    const [dialogOpen, setDialogOpen] = useState(false);
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

  const [selectedAddress, setSelectedAddress] = useState(0);


 
  const handleSelectChange = (event) => {
    const index = event.target.value;
    const selectedDeliveryAddress = addresses[index];
    console.log("selected")
    console.log(selectedDeliveryAddress);
    
    addOrderDetails(selectedDeliveryAddress);
    setSelectedAddress(event.target.value);
    
  };

  



  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 400, margin: 'auto',marginTop:3 }}>
      <Typography sx={{color:'tertiary.main'}} variant="h6" gutterBottom>
        Select Address
      </Typography>

      <RadioGroup value={selectedAddress} onChange={handleSelectChange}>
        {addresses.map((address, index) => (
          <FormControlLabel
          sx={{padding:'0.8rem'}}
            key={index}
            value={index}
            control={<Radio />}
            label={`${address.fullName}, 
                    ${address.mobileNumber},
                    ${address.flat}, 
                    ${address.area}, 
                    ${address.landmark}, 
                    ${address.city}, 
                    ${address.state}, 
                   ${address.pincode},
                    ${address.country}`}
          />
        ))}
      </RadioGroup>

      <Button variant="outlined" sx={{color:'tertiary.main', borderColor:"tertiary.main",marginTop:'1rem'}} onClick={handleOpenDialog}>Add New address</Button>
          <AddAddressDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        addToAddresses={handleAddAddress}
      />

     
    </Paper>
  );
};

export default AddressSelector;
