import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [passwords, setPasswords] = useState({
    password: '',
    confirmPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    password: false,
    confirmPassword: false,
  });
  const [loading, setLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [validationErrors, setValidationErrors] = useState({});

  const validatePasswords = () => {
    const errors = {};
    if (!passwords.password) {
      errors.password = 'Password is required';
    } else if (passwords.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwords.password)) {
      errors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    if (!passwords.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (passwords.password !== passwords.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePasswords()) return;

    setLoading(true);
    try {
      // TODO: Replace with your actual API call
      const response = await fetch('https://real-time-ecommerce-api.onrender.com/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password: passwords.password,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to reset password');
      }

      setSnackbarMessage('Password has been successfully reset');
      setSnackbarSeverity('success');
      setShowSnackbar(true);
      
      // Redirect to login page after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setSnackbarMessage(error.message || 'Failed to reset password');
      setSnackbarSeverity('error');
      setShowSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (field) => (e) => {
    setPasswords(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const togglePasswordVisibility = (field) => () => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
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
            Please enter your new password.
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="New Password"
              type={showPasswords.password ? 'text' : 'password'}
              id="password"
              value={passwords.password}
              onChange={handlePasswordChange('password')}
              error={!!validationErrors.password}
              helperText={validationErrors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility('password')}
                      edge="end"
                    >
                      {showPasswords.password ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showPasswords.confirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handlePasswordChange('confirmPassword')}
              error={!!validationErrors.confirmPassword}
              helperText={validationErrors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility('confirmPassword')}
                      edge="end"
                    >
                      {showPasswords.confirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
                'Reset Password'
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

export default ResetPassword;
