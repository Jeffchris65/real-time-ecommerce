import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/authSlice';
import { CircularProgress, Box, Typography } from '@mui/material';

const SocialLoginSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      // Store token in localStorage
      localStorage.setItem('token', token);

      // Fetch user data
      fetch('/api/auth/user', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          dispatch(setUser(data));
          navigate('/account');
        })
        .catch(err => {
          console.error('Error fetching user data:', err);
          navigate('/login');
        });
    } else {
      navigate('/login');
    }
  }, [location, dispatch, navigate]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
      gap={2}
    >
      <CircularProgress />
      <Typography variant="h6" color="textSecondary">
        Completing login...
      </Typography>
    </Box>
  );
};

export default SocialLoginSuccess;
