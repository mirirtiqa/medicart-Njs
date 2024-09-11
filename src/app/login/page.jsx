"use client";
import React, { useState, useRef } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography, Alert, Container } from '@mui/material';
import { useAuth } from '@/contexts/AuthContexts';
import { useRouter } from 'next/navigation';
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Login() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDoctorLogin, setIsDoctorLogin] = useState(false); // State to toggle between user and doctor login

  const emailRef = useRef();
  const passwordRef = useRef();
  const doctorCodeRef = useRef(); // Ref for Doctor's code

  const { login, signInWithGoogle } = useAuth();
  const router = useRouter();

  const verifyDoctorCode = async (userId, doctorCode) => {
    try {
      const doctorDocRef = doc(db, "doctors", userId);
      const doctorDoc = await getDoc(doctorDocRef);

      if (doctorDoc.exists()) {
        const data = doctorDoc.data();
        return data.code === doctorCode;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error verifying doctor's code:", error);
      return false;
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);

      const userCredential = await login(emailRef.current.value, passwordRef.current.value);
      const user = userCredential.user;

      if (isDoctorLogin) {
        // Verify doctor's code
        const isCodeValid = await verifyDoctorCode(user.uid, doctorCodeRef.current.value);
        
        if (!isCodeValid) {
          setError('Invalid Doctor\'s Code');
          setLoading(false);
          return;
        }
      }

      router.push('/');
    } catch (err) {
      setError('Sorry! Failed to log in');
      console.error(err.message);
    }
    setLoading(false);
  }

  async function handleGoogleSignIn() {
    setError('');
    setLoading(true);

    try {
      const result = await signInWithGoogle();
      const user = result.user;
      
      if (isDoctorLogin) {
        // Verify doctor's code
        const isCodeValid = await verifyDoctorCode(user.uid, doctorCodeRef.current.value);

        if (!isCodeValid) {
          setError('Invalid Doctor\'s Code');
          setLoading(false);
          return;
        }
      }

      router.push('/');
    } catch (err) {
      setError('Sorry, failed to Login!');
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container component="main" maxWidth="xs" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card sx={{ width: '100%', maxWidth: 400, color: "tertiary.main" }}>
        <CardContent>
          <Typography variant="h5" component="h2" align="center" gutterBottom>
            {isDoctorLogin ? 'Doctor Login' : 'Login'}
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

            {isDoctorLogin && (
              <TextField
                margin="normal"
                required
                fullWidth
                name="doctor-code"
                label="Doctor's Code"
                type="password" // Asterisked input
                id="doctor-code"
                inputRef={doctorCodeRef}
              />
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ mt: 2, mb: 2, backgroundColor: 'tertiary.main', color: 'secondary.main' }}
            >
              Submit
            </Button>
          </Box>
        </CardContent>

        {!isDoctorLogin && (
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
        )}

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          {isDoctorLogin ? (
            <>
              Need an account? <Button href="/signup" variant="text">Sign Up</Button>
            </>
          ) : (
            <>
              Are you a doctor? <Button onClick={() => setIsDoctorLogin(true)} variant="text">Login as Doctor</Button>
            </>
          )}
        </Typography>

        {isDoctorLogin && (
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            <Button onClick={() => setIsDoctorLogin(false)} variant="text">Login as User</Button>
          </Typography>
        )}
      </Card>
    </Container>
  );
}
