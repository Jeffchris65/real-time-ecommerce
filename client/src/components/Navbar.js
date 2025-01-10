import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  InputBase,
  Badge,
  IconButton,
  Select,
  MenuItem,
  styled,
  alpha,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#fff',
  '&:hover': {
    backgroundColor: '#fff',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
    flexGrow: 1,
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  right: 0,
  top: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#febd69',
  borderTopRightRadius: theme.shape.borderRadius,
  borderBottomRightRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#f3a847',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 2),
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
  },
}));

const Navbar = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('all');
  const cartItemCount = 0; // Replace with actual cart count from your state management

  return (
    <AppBar position="sticky" sx={{ bgcolor: '#131921' }}>
      <Toolbar sx={{ gap: 2 }}>
        {/* Logo */}
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ cursor: 'pointer', color: 'white', fontWeight: 'bold' }}
          onClick={() => navigate('/')}
        >
          amazon
        </Typography>

        {/* Deliver To */}
        <Button
          color="inherit"
          startIcon={<LocationOnOutlinedIcon />}
          sx={{ display: { xs: 'none', md: 'flex' }, textTransform: 'none', minWidth: 'auto' }}
        >
          <Box sx={{ textAlign: 'left' }}>
            <Typography variant="caption" display="block">
              Deliver to
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1 }}>
              Kenya
            </Typography>
          </Box>
        </Button>

        {/* Search Bar */}
        <Search>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              size="small"
              sx={{
                bgcolor: '#f3f3f3',
                '& .MuiSelect-select': {
                  py: 0.5,
                  pr: 2,
                },
              }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="fashion">Fashion</MenuItem>
              <MenuItem value="books">Books</MenuItem>
            </Select>
            <StyledInputBase placeholder="Search Amazon" />
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
          </Box>
        </Search>

        {/* Account & Lists */}
        <Button
          color="inherit"
          sx={{ display: { xs: 'none', md: 'block' }, textTransform: 'none' }}
          onClick={() => navigate('/account')}
        >
          <Box sx={{ textAlign: 'left' }}>
            <Typography variant="caption" display="block">
              Hello, Sign in
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1 }}>
              Account & Lists
            </Typography>
          </Box>
        </Button>

        {/* Returns & Orders */}
        <Button
          color="inherit"
          sx={{ display: { xs: 'none', md: 'block' }, textTransform: 'none' }}
          onClick={() => navigate('/orders')}
        >
          <Box sx={{ textAlign: 'left' }}>
            <Typography variant="caption" display="block">
              Returns
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1 }}>
              & Orders
            </Typography>
          </Box>
        </Button>

        {/* Cart */}
        <IconButton
          color="inherit"
          onClick={() => navigate('/cart')}
          sx={{ display: 'flex', flexDirection: 'row', gap: 0.5 }}
        >
          <Badge badgeContent={cartItemCount} color="warning">
            <ShoppingCartIcon />
          </Badge>
          <Typography variant="body1">Cart</Typography>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
