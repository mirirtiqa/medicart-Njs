"use client";
// pages/checkout.js
import { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Box, TextField, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const steps = ['Select Address', 'Select Payment Method', 'Review Items'];

function Checkout() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      console.log('Order submitted');
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    
    <Box sx={{ width: '100%', marginTop:'10px' }}>
        <h1>This is Work Under Progress</h1>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step 
          key={label}>
            <StepLabel >{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
          <Button
          sx={{
            backgroundColor: 'tertiary.main',
            color:"white"
          }}
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
           sx={{
            backgroundColor: 'tertiary.main',
            color:"white"
          }}
            variant="contained"
            onClick={handleNext}
          >
            {activeStep === steps.length - 1 ? 'Submit Order' : 'Next'}
          </Button>
        </Box>
      </div>
    </Box>
  );
}

export default Checkout;

