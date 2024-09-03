"use client";
import React, { useState, useRef } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography, Alert, Container } from '@mui/material';
import { useAuth } from '@/contexts/AuthContexts';
import { useRouter } from 'next/navigation' 

export default function Signup() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup,signInWithGoogle } = useAuth();
  const router = useRouter(); 


  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      const userCredential = await signup(emailRef.current.value, passwordRef.current.value);
      const user = userCredential.user;
      console.log(user);

      router.push('/'); 
    } catch (err) {
      setError('Sorry! Failed to create an account');
      console.error(err.message);
    }
    setLoading(false);
  }
  async function handleGoogleSignIn() {
    setError('');  
    setLoading(true);  

    try {
      setError('');
      setLoading(true);
      const result = await signInWithGoogle();
      const user = result.user;
      console.log(user);
      const userDetails = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
      router.push('/');
    } catch (err) {
      setError('Sorry! Failed to create an account');
      console.error(err.message);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <Container component="main" maxWidth="xs" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card sx={{ width: '100%', maxWidth: 400, color:"tertiary.main" }}>
        <CardContent>
          <Typography variant="h5" component="h2" align="center" gutterBottom>
            Sign Up
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              inputRef={emailRef}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              inputRef={passwordRef}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="confirm-password"
              label="Confirm Password"
              type="password"
              id="confirm-password"
              inputRef={passwordConfirmRef}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 2, mb: 2,backgroundColor:'tertiary.main',color:'secondary.main'}}
            >
              Submit
            </Button>
          </Box>
        </CardContent>
        {/* <Typography variant="body2" align="center" sx={{ mt: 2, mb: 2,ml:2,mr:2,  border:'1px solid black',padding: 1,  }}>
           <Button href="/login" variant="text" onClick={handleGoogleSignIn}>Sign up with Google</Button> 
        </Typography> */}
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <Button 
              variant="outlined" 
              onClick={handleGoogleSignIn} 
              disabled={loading}
              sx={{ border: '1px solid black', padding: '0.5rem 1rem', textTransform: 'none' }}
            >
              Sign up with Google
            </Button>
          </Box>
        <Typography variant="body2" align="center" sx={{ mt: 2, }}>
          Already have an account? <Button href="/login" variant="text">Log In</Button> 
        </Typography>
      </Card>
    </Container>
  );
}