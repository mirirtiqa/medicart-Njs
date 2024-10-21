"use client";
import React, { useState, useEffect } from 'react';
import { Paper, RadioGroup, Radio, FormControlLabel, Button, Typography } from '@mui/material';
import { useCart } from '@/contexts/CardContext';
import AddAddressDialog from '@/components/AddAddressDialog';

const AddressSelector = ({ addOrderDetails }) => {
  const { addresses, addToAddresses } = useCart();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleAddAddress = (address) => {
    addToAddresses(address);
    setSelectedAddress(address); // Automatically select the newly added address
    addOrderDetails(address);
  };

  const handleSelectChange = (event) => {
    const selectedDeliveryAddress = event.target.value;
    setSelectedAddress(selectedDeliveryAddress);
    addOrderDetails(selectedDeliveryAddress);
  };

  useEffect(() => {
    if (addresses.length > 0) {
      setSelectedAddress(addresses[0]); // Set default to the first address if available
      addOrderDetails(addresses[0]);
    }
  }, [addresses]);

  return (
    <Paper elevation={3} sx={{ padding: 3, maxWidth: 400, margin: 'auto', marginTop: 3 }}>
      <Typography sx={{ color: 'tertiary.main' }} variant="h6" gutterBottom>
        Select Address
      </Typography>

      <RadioGroup value={selectedAddress} onChange={handleSelectChange}>
        {addresses.map((address) => (
          <FormControlLabel
            key={address.id}
            value={address} // Use address object as the value
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

      <Button variant="outlined" sx={{ color: 'tertiary.main', borderColor: "tertiary.main", marginTop: '1rem' }} onClick={handleOpenDialog}>Add New Address</Button>
      <AddAddressDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        addToAddresses={handleAddAddress}
      />
    </Paper>
  );
};

export default AddressSelector;
