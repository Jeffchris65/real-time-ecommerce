import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Divider,
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Google as GoogleIcon,
  Facebook as FacebookIcon,
} from '@mui/icons-material';
import { login } from '../redux/slices/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!credentials.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(credentials.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!credentials.password) {
      errors.password = 'Password is required';
    } else if (credentials.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await dispatch(login(credentials)).unwrap();
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', credentials.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      setSnackbarMessage('Login successful!');
      setSnackbarSeverity('success');
      setShowSnackbar(true);
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setSnackbarMessage(err.message || 'Failed to login. Please try again.');
      setSnackbarSeverity('error');
      setShowSnackbar(true);
    }
  };

  const handleSocialLogin = (provider) => {
    setSnackbarMessage(`${provider} login coming soon!`);
    setSnackbarSeverity('info');
    setShowSnackbar(true);
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
            Welcome Back
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
              value={credentials.email}
              onChange={handleChange}
              error={!!validationErrors.email}
              helperText={validationErrors.email}
              sx={{ mb: 2 }}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={credentials.password}
              onChange={handleChange}
              error={!!validationErrors.password}
              helperText={validationErrors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 1 }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    color="primary"
                  />
                }
                label="Remember me"
              />
              <Button
                variant="text"
                onClick={() => navigate('/forgot-password')}
                sx={{ textTransform: 'none' }}
              >
                Forgot password?
              </Button>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: 2,
                mb: 2,
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
                'Login'
              )}
            </Button>

            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                onClick={() => handleSocialLogin('Google')}
                sx={{ py: 1 }}
              >
                Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FacebookIcon />}
                onClick={() => handleSocialLogin('Facebook')}
                sx={{ py: 1 }}
              >
                Facebook
              </Button>
            </Box>

            <Box sx={{ textAlign: 'center' }}>
              <Button
                variant="text"
                onClick={() => navigate('/register')}
                sx={{ textTransform: 'none' }}
              >
                Don't have an account? Sign Up
              </Button>
            </Box>
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

export default Login;
