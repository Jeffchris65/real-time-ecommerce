import React from 'react';
import { Box, Container, Typography, Grid, Link, Divider } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              About Us
            </Typography>
            <Link href="#" color="text.secondary" display="block">
              Our Story
            </Link>
            <Link href="#" color="text.secondary" display="block">
              Careers
            </Link>
            <Link href="#" color="text.secondary" display="block">
              Press
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Customer Service
            </Typography>
            <Link href="#" color="text.secondary" display="block">
              Contact Us
            </Link>
            <Link href="#" color="text.secondary" display="block">
              Shipping Policy
            </Link>
            <Link href="#" color="text.secondary" display="block">
              Returns & Exchanges
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Connect With Us
            </Typography>
            <Link href="#" color="text.secondary" display="block">
              Facebook
            </Link>
            <Link href="#" color="text.secondary" display="block">
              Twitter
            </Link>
            <Link href="#" color="text.secondary" display="block">
              Instagram
            </Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Newsletter
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Subscribe to our newsletter for updates and exclusive offers!
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body2" color="text.secondary" align="center">
          {'© '}
          {new Date().getFullYear()}
          {' E-Commerce. All rights reserved.'}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
