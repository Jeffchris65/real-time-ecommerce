import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Divider,
  Alert,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from '@mui/material';
import {
  Person,
  Email,
  CheckCircle,
  Warning,
  Google,
  Facebook,
  Security,
  ShoppingBag,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';

const Account = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleResendVerification = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message });
      } else {
        setMessage({ type: 'error', text: data.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to resend verification email' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (!user) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h5">Please log in to view your account</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/login')}
            sx={{ mt: 2 }}
          >
            Go to Login
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Account
      </Typography>

      {message && (
        <Alert
          severity={message.type}
          onClose={() => setMessage(null)}
          sx={{ mb: 2 }}
        >
          {message.text}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Profile Information
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="Name" secondary={user.name} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Email />
                </ListItemIcon>
                <ListItemText primary="Email" secondary={user.email} />
                {user.isVerified ? (
                  <Chip
                    icon={<CheckCircle />}
                    label="Verified"
                    color="success"
                    variant="outlined"
                  />
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                      icon={<Warning />}
                      label="Not Verified"
                      color="warning"
                      variant="outlined"
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleResendVerification}
                      disabled={loading}
                    >
                      {loading ? (
                        <CircularProgress size={20} />
                      ) : (
                        'Resend Verification'
                      )}
                    </Button>
                  </Box>
                )}
              </ListItem>
            </List>
          </Paper>

          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Connected Accounts
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Google />
                </ListItemIcon>
                <ListItemText
                  primary="Google"
                  secondary={
                    user.socialLogins?.google
                      ? 'Connected'
                      : 'Not connected'
                  }
                />
                {!user.socialLogins?.google && (
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<Google />}
                    href="/api/auth/google"
                  >
                    Connect
                  </Button>
                )}
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Facebook />
                </ListItemIcon>
                <ListItemText
                  primary="Facebook"
                  secondary={
                    user.socialLogins?.facebook
                      ? 'Connected'
                      : 'Not connected'
                  }
                />
                {!user.socialLogins?.facebook && (
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<Facebook />}
                    href="/api/auth/facebook"
                  >
                    Connect
                  </Button>
                )}
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <List>
              <ListItem>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<ShoppingBag />}
                  onClick={() => navigate('/orders')}
                >
                  My Orders
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Security />}
                  onClick={() => navigate('/reset-password')}
                >
                  Change Password
                </Button>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  variant="outlined"
                  color="error"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Account;
