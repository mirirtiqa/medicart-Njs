"use client"
import React from 'react';
import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography, MenuItem, Select, InputLabel } from '@mui/material';

const PaymentComponent = ({addOrderDetails}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState('card');
  const [selectedCard, setSelectedCard] = React.useState('');

  const handlePaymentMethodChange = (event) => {
    const method = event.target.value;
    const paymentMethod = 'paymentMethod';
    addOrderDetails(paymentMethod,method);
    setSelectedPaymentMethod(event.target.value);
  };

  const handleCardChange = (event) => {
    setSelectedCard(event.target.value);
  };

  return (
    <Box sx={{ padding: 3,  maxWidth: 600, margin: 'auto',marginTop:'1rem', border: '1px solid #ccc', borderRadius: 2,boxShadow:'2',}}>
      {/* <Typography variant="h6" gutterBottom>
        Apply Promo Code
      </Typography> */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField label="Enter Promo Code" variant="outlined" size="small" />
        <Button variant="outlined" sx={{ color: 'tertiary.main', borderColor: 'tertiary.main' }}>
              Apply
            </Button>
      </Box>
      
      
      <Typography variant="h6" gutterBottom sx={{ mt: 2,color:"tertiary.main" }}>
        Payment method
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup value={selectedPaymentMethod} onChange={handlePaymentMethodChange}>
          <FormControlLabel value="card" control={<Radio />} label="Credit or debit card" />
          <FormControlLabel value="netbanking" control={<Radio />} label="Net Banking" />
          <FormControlLabel value="upi" control={<Radio />} label="Other UPI Apps" />
          <FormControlLabel value="emi" control={<Radio />} label="EMI" />
          <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery/Pay on Delivery" />
        </RadioGroup>
      </FormControl>

      {selectedPaymentMethod === 'netbanking' && (
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Choose an Option</InputLabel>
          <Select defaultValue="">
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value="bank1">Bank 1</MenuItem>
            <MenuItem value="bank2">Bank 2</MenuItem>
            {/* Add more options as needed */}
          </Select>
        </FormControl>
      )}

      <Button variant="contained" color="white"  fullWidth sx={{ mt: 3,bgcolor:"tertiary.main",color:"white" }}>
        Use this payment method
      </Button>
    </Box>
  );
};

export default PaymentComponent;
