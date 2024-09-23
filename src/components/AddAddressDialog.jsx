"use client"
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControlLabel, Checkbox, Box, Grid, IconButton, Select, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';

const StyledDialog = styled(Dialog)`
  .MuiPaper-root {
    padding: 16px;
    border-radius: 8px;
    max-width: 600px;
  }
`;

const AddAddressDialog = ({ open, onClose, addToAddresses }) => {
  const [formData, setFormData] = useState({
    country: 'India',
    fullName: '',
    mobileNumber: '',
    pincode: '',
    flat: '',
    area: '',
    landmark: '',
    city: '',
    state: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = () => {
    const { country, fullName, mobileNumber, pincode, flat, area, landmark, city, state } = formData;
    if (!fullName || !mobileNumber || !pincode || !flat || !area || !landmark || !city || !state) {
      alert("Please fill out all required fields");
      return;
    }
    const addressString = `
      Country: ${formData.country}, 
      Full Name: ${formData.fullName}, 
      Mobile: ${formData.mobileNumber}, 
      Pincode: ${formData.pincode}, 
      Flat: ${formData.flat}, 
      Area: ${formData.area}, 
      Landmark: ${formData.landmark}, 
      City: ${formData.city}, 
      State: ${formData.state}
    `;
    addToAddresses(formData);
    onClose();
  };

  return (
    <StyledDialog open={open} onClose={onClose}>
      <DialogTitle sx={{color:'tertiary.main'}}>
        Add a new address
        <IconButton
          aria-label="close"
          onClick={onClose}
          style={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Select
              fullWidth
              value={formData.country}
              onChange={handleChange}
              name="country"
              required
            >
              <MenuItem value="India">India</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full name (First and Last name)"
              variant="outlined"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mobile number"
              variant="outlined"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Pincode"
              variant="outlined"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Flat, House no., Building, Company, Apartment"
              variant="outlined"
              name="flat"
              value={formData.flat}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Area, Street, Sector, Village"
              variant="outlined"
              name="area"
              value={formData.area}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Landmark"
              variant="outlined"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Town/City"
              variant="outlined"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              fullWidth
              value={formData.state}
              onChange={handleChange}
              required
              name="state"
            >
              <MenuItem value="">Choose a state</MenuItem>
              <MenuItem value="Karnataka">Karnataka</MenuItem>
              <MenuItem value="JK">JK</MenuItem>
              <MenuItem value="Maharashtra">Maharashtra</MenuItem>
              {/* Add more states as needed */}
            </Select>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
        sx={{
          backgroundColor: 'tertiary.main',
          color: 'white',
          '&:hover': { bgcolor: 'white', color: 'tertiary.main' }
        }}
        onClick={handleSave} variant="contained" color="primary">
          Add Address
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default AddAddressDialog;
