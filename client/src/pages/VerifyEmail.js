import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  CircularProgress,
  Box,
  Button,
} from '@mui/material';
import { CheckCircle, Error } from '@mui/icons-material';

const VerifyEmail = () => {
  const [status, setStatus] = useState('loading');
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`/api/auth/verify-email/${token}`);
        const data = await response.json();

        if (response.ok) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error('Error verifying email:', error);
        setStatus('error');
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token]);

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <>
            <CircularProgress size={60} sx={{ mb: 2 }} />
            <Typography variant="h6">Verifying your email...</Typography>
          </>
        );

      case 'success':
        return (
          <>
            <CheckCircle color="success" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Email Verified Successfully!
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Your email has been verified. You can now access all features of your account.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/login')}
              sx={{ mt: 2 }}
            >
              Go to Login
            </Button>
          </>
        );

      case 'error':
        return (
          <>
            <Error color="error" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Verification Failed
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              The verification link is invalid or has expired. Please request a new verification email.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/login')}
              sx={{ mt: 2 }}
            >
              Go to Login
            </Button>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        {renderContent()}
      </Paper>
    </Container>
  );
};

export default VerifyEmail;
