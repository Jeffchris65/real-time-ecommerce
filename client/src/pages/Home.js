import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Rating,
  Chip,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const Home = () => {
  const navigate = useNavigate();

  const deals = [
    {
      id: 1,
      title: 'Samsung 50" 4K Smart TV',
      price: 399.99,
      originalPrice: 599.99,
      rating: 4.5,
      reviews: 2345,
      image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6401/6401722_sd.jpg',
      prime: true,
    },
    {
      id: 2,
      title: 'Sony WH-1000XM4 Headphones',
      price: 299.99,
      originalPrice: 349.99,
      rating: 4.8,
      reviews: 12543,
      image: 'https://www.sony.com/image/5d02da5df552836db894cead8a68f5f3?fmt=png-alpha&wid=660&hei=660',
      prime: true,
    },
    {
      id: 3,
      title: 'MacBook Air M2',
      price: 999.99,
      originalPrice: 1199.99,
      rating: 4.9,
      reviews: 8976,
      image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=452&hei=420&fmt=jpeg&qlt=95&.v=1653084303665',
      prime: true,
    },
    {
      id: 4,
      title: 'Apple Watch Series 8',
      price: 399.99,
      originalPrice: 429.99,
      rating: 4.7,
      reviews: 5632,
      image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MKUQ3_VW_34FR+watch-45-alum-midnight-nc-8s_VW_34FR_WF_CO?wid=750&hei=712&trim=1%2C0&fmt=p-jpg&qlt=95&.v=1632171067000%2C1661971867159',
      prime: true,
    }
  ];

  const categories = [
    'Electronics',
    'Home & Kitchen',
    'Fashion',
    'Books',
    'Toys & Games',
    'Sports & Outdoors',
  ];

  return (
    <Box sx={{ bgcolor: '#f3f3f3', minHeight: '100vh' }}>
      {/* Categories Bar */}
      <Paper sx={{ mb: 2 }}>
        <Container>
          <Box sx={{ py: 1, display: 'flex', gap: 2, overflowX: 'auto' }}>
            {categories.map((category) => (
              <Button
                key={category}
                sx={{ whiteSpace: 'nowrap' }}
                onClick={() => navigate(`/category/${category.toLowerCase()}`)}
              >
                {category}
              </Button>
            ))}
          </Box>
        </Container>
      </Paper>

      <Container>
        {/* Hero Section */}
        <Paper
          sx={{
            height: 300,
            mb: 4,
            bgcolor: '#232f3e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
          }}
        >
          <Typography variant="h3" sx={{ textAlign: 'center', px: 2 }}>
            New Year Sale<br />
            Up to 70% Off
          </Typography>
        </Paper>

        {/* Today's Deals Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            Today's Deals
          </Typography>
          <Grid container spacing={3}>
            {deals.map((deal) => (
              <Grid item xs={12} sm={6} md={3} key={deal.id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    position: 'relative',
                    '&:hover': {
                      cursor: 'pointer',
                      boxShadow: 3,
                      transform: 'translateY(-4px)',
                      transition: 'all 0.3s ease-in-out',
                    },
                  }}
                  onClick={() => navigate(`/product/${deal.id}`)}
                >
                  {deal.prime && (
                    <Chip
                      label="Prime"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        bgcolor: '#232f3e',
                        color: 'white',
                        zIndex: 1,
                      }}
                    />
                  )}
                  <CardMedia
                    component="img"
                    height="200"
                    image={deal.image}
                    alt={deal.title}
                    sx={{ 
                      objectFit: 'contain',
                      bgcolor: 'white',
                      p: 2 
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                    }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="subtitle1" component="div" noWrap>
                      {deal.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Rating value={deal.rating} precision={0.1} size="small" readOnly />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        ({deal.reviews.toLocaleString()})
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                      <Typography variant="h6" color="error">
                        ${deal.price}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ textDecoration: 'line-through' }}
                      >
                        ${deal.originalPrice}
                      </Typography>
                    </Box>
                    {deal.prime && (
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <LocalShippingIcon sx={{ fontSize: 16, mr: 0.5 }} />
                        <Typography variant="caption">Free Prime Delivery</Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Recommended Products */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            Recommended for You
          </Typography>
          <Grid container spacing={3}>
            {/* Add recommended products here similar to deals */}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
