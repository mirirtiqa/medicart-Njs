"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { Stepper, Step, StepLabel, Button, Box, Snackbar, Alert } from '@mui/material';
import AddressSelector from './AddressSelector';
import PaymentComponent from './PaymentComponent';
import { useCart } from '@/contexts/CardContext';
import ReviewItems from './ReviewItems';

const steps = ['Select Address', 'Select Payment Method', 'Review Your Order'];

function Checkout() {
  const { cartItems, addOrder } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  const [delAddress, setDelAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const router = useRouter();

  function addDelAddress(address) {
    if (address) {
      setDelAddress(address);
    }
  }

  function addPaymentMethod(method) {
    if (method) {
      setPaymentMethod(method);
    }
  }

  const handleNext = () => {
    if (activeStep === 0 && !delAddress) {
      setSnackbarMessage('Please select a delivery address before proceeding.');
      setOpenSnackbar(true);
      return;
    }

    if (activeStep === steps.length - 1) {
      console.log("order submitted");
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmitOrder = () => {
    addOrder(delAddress, paymentMethod);
    router.push('/submitOrder');
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ width: '100%', marginTop: '10px' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === 0 && (
          <div>
            <AddressSelector addOrderDetails={addDelAddress} />
          </div>
        )}
        {activeStep === 1 && (
          <div>
            <PaymentComponent addOrderDetails={addPaymentMethod} />
          </div>
        )}
        {activeStep === 2 && (
          <div>
            <ReviewItems address={delAddress} paymentMethod={paymentMethod} />
          </div>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
          <Button
            sx={{ backgroundColor: 'tertiary.main', color: "white" }}
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>

          {activeStep === steps.length - 1 ? 
            <Button
              sx={{ backgroundColor: 'tertiary.main', color: "white" }}
              variant="contained"
              onClick={handleSubmitOrder}
            >
              Submit Order
            </Button> : 
            <Button
              sx={{ backgroundColor: 'tertiary.main', color: "white" }}
              variant="contained"
              onClick={handleNext}
            >
              Next
            </Button>
          }
        </Box>
      </div>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="warning" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Checkout;
