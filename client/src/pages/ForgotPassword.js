import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [validationError, setValidationError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return 'Email is required';
    }
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateEmail(email);
    if (error) {
      setValidationError(error);
      return;
    }

    setLoading(true);
    try {
      // TODO: Replace with your actual API call
      const response = await fetch('https://real-time-ecommerce-api.onrender.com/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send reset email');
      }

      setSnackbarMessage('Password reset link has been sent to your email');
      setSnackbarSeverity('success');
      setShowSnackbar(true);
      
      // Redirect to login page after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setSnackbarMessage(error.message || 'Failed to send reset email');
      setSnackbarSeverity('error');
      setShowSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ 
        mt: 8, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' 
      }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            width: '100%',
            borderRadius: 2,
            backgroundColor: 'background.paper',
          }}
        >
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/login')}
            sx={{ mb: 3 }}
          >
            Back to Login
          </Button>

          <Typography 
            variant="h4" 
            align="center" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              color: 'primary.main',
              mb: 3
            }}
          >
            Reset Password
          </Typography>

          <Typography 
            variant="body1" 
            align="center" 
            sx={{ mb: 4, color: 'text.secondary' }}
          >
            Enter your email address and we'll send you instructions to reset your password.
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setValidationError('');
              }}
              error={!!validationError}
              helperText={validationError}
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.5,
                position: 'relative',
                backgroundColor: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: 'white' }} />
              ) : (
                'Send Reset Link'
              )}
            </Button>
          </form>
        </Paper>
      </Box>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ForgotPassword;
