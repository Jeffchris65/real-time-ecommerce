import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaMapMarkerAlt, FaBars } from 'react-icons/fa';

const Navbar = () => {
  const [searchFocus, setSearchFocus] = useState(false);

  return (
    <NavContainer>
      <MainNav>
        <LogoContainer to="/">
          <Logo>amazon</Logo>
        </LogoContainer>

        <DeliveryLocation>
          <FaMapMarkerAlt />
          <div>
            <Small>Deliver to</Small>
            <Location>Kenya</Location>
          </div>
        </DeliveryLocation>

        <SearchContainer focus={searchFocus}>
          <SearchSelect>
            <option>All</option>
            <option>Electronics</option>
            <option>Computers</option>
            <option>Smart Home</option>
            <option>Arts & Crafts</option>
          </SearchSelect>
          <SearchInput 
            type="text" 
            placeholder="Search Amazon"
            onFocus={() => setSearchFocus(true)}
            onBlur={() => setSearchFocus(false)}
          />
          <SearchButton>
            <FaSearch />
          </SearchButton>
        </SearchContainer>

        <NavLinks>
          <NavLink to="/account">
            <Small>Hello, Sign in</Small>
            <Bold>Account & Lists</Bold>
          </NavLink>

          <NavLink to="/orders">
            <Small>Returns</Small>
            <Bold>& Orders</Bold>
          </NavLink>

          <CartLink to="/cart">
            <CartIcon>
              <FaShoppingCart />
              <CartCount>0</CartCount>
            </CartIcon>
            <CartText>Cart</CartText>
          </CartLink>
        </NavLinks>
      </MainNav>

      <SubNav>
        <MenuButton>
          <FaBars />
          All
        </MenuButton>
        <SubNavLinks>
          <SubNavLink to="/deals">Today's Deals</SubNavLink>
          <SubNavLink to="/customer-service">Customer Service</SubNavLink>
          <SubNavLink to="/registry">Registry</SubNavLink>
          <SubNavLink to="/gift-cards">Gift Cards</SubNavLink>
          <SubNavLink to="/sell">Sell</SubNavLink>
        </SubNavLinks>
      </SubNav>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  background: ${props => props.theme.colors.primary};
  color: white;
`;

const MainNav = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  max-width: ${props => props.theme.breakpoints.wide};
  margin: 0 auto;
`;

const LogoContainer = styled(Link)`
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  &:hover {
    outline: 1px solid white;
  }
`;

const Logo = styled.span`
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
`;

const DeliveryLocation = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    outline: 1px solid white;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  flex: 1;
  margin: 0 1rem;
  border-radius: 4px;
  overflow: hidden;
  ${props => props.focus && `
    outline: 3px solid ${props.theme.colors.accent};
  `}
`;

const SearchSelect = styled.select`
  padding: 0 0.5rem;
  background: #F3F3F3;
  border: none;
  border-right: 1px solid #CDCDCD;
  cursor: pointer;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.7rem;
  border: none;
  font-size: 1rem;
  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  width: 45px;
  background: ${props => props.theme.colors.highlight};
  border: none;
  cursor: pointer;
  &:hover {
    background: ${props => props.theme.colors.accent};
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  padding: 0.5rem;
  color: white;
  text-decoration: none;
  &:hover {
    outline: 1px solid white;
  }
`;

const Small = styled.div`
  font-size: 0.7rem;
`;

const Bold = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
`;

const Location = styled(Bold)`
  display: flex;
  align-items: center;
`;

const CartLink = styled(NavLink)`
  display: flex;
  align-items: flex-end;
`;

const CartIcon = styled.div`
  position: relative;
  font-size: 1.8rem;
`;

const CartCount = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: ${props => props.theme.colors.accent};
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
  font-weight: bold;
  padding: 0 4px;
  border-radius: 50%;
`;

const CartText = styled.span`
  font-weight: bold;
  margin-left: 5px;
`;

const SubNav = styled.div`
  background: ${props => props.theme.colors.secondary};
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    outline: 1px solid white;
  }
`;

const SubNavLinks = styled.div`
  display: flex;
  margin-left: 1rem;
`;

const SubNavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.5rem;
  font-size: 0.9rem;
  &:hover {
    outline: 1px solid white;
  }
`;

export default Navbar;
