"use client";
import React, { useState, useRef } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography, Alert, Container } from '@mui/material';
import { useAuth } from '@/contexts/AuthContexts'; 
import { useRouter } from 'next/navigation'; 

export default function Login() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter(); 
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login,signInWithGoogle  } = useAuth();


  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      router.push('/'); 
    } catch (err) {
      setError('Sorry! Failed to log In');
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
      setError('Sorry, failed to Login!');
      console.error(err.message);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <Container component="main" maxWidth="xs" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card sx={{ width: '100%', maxWidth: 400, color:"tertiary.main"}}>
        <CardContent>
          <Typography variant="h5" component="h2" align="center" gutterBottom>
            Login
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
              autoComplete="current-password"
              inputRef={passwordRef}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ mt: 2, mb: 2 ,backgroundColor:'tertiary.main',color:'secondary.main' }}
            >
              Submit
            </Button>
          </Box>
        </CardContent>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <Button 
              variant="outlined" 
              onClick={handleGoogleSignIn} 
              disabled={loading}
              sx={{ border: '1px solid black', padding: '0.5rem 1rem', textTransform: 'none' }}
            >
              Login with Google
            </Button>
          </Box>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Need an account? <Button href="/signup" variant="text">Sign Up</Button> 
        </Typography>
      </Card>
    </Container>
  );
}
