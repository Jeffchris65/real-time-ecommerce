import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Rating,
  Chip,
} from '@mui/material';
import { AddShoppingCart, Favorite } from '@mui/icons-material';
import { addToCart } from '../redux/slices/cartSlice';

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items.slice(0, 4));

  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={3}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: '0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.1)',
              },
            }}
          >
            <Box sx={{ position: 'relative' }}>
              <CardMedia
                component="img"
                height="280"
                image={product.images[0] || 'https://via.placeholder.com/280'}
                alt={product.name}
                sx={{
                  objectFit: 'cover',
                }}
              />
              <Chip
                label="Featured"
                color="secondary"
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                }}
              />
            </Box>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {product.name}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 1,
                }}
              >
                <Rating value={4.5} precision={0.5} readOnly size="small" />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  (4.5)
                </Typography>
              </Box>
              <Typography variant="h6" color="primary" gutterBottom>
                ${product.price.toFixed(2)}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {product.description}
              </Typography>
            </CardContent>
            <CardActions sx={{ p: 2, pt: 0 }}>
              <Button
                variant="contained"
                startIcon={<AddShoppingCart />}
                fullWidth
                onClick={() => dispatch(addToCart(product))}
                sx={{
                  mr: 1,
                }}
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                sx={{
                  minWidth: 'auto',
                  p: 1,
                }}
              >
                <Favorite />
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default FeaturedProducts;
