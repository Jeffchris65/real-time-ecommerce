import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>About Us</h3>
          <p>We are passionate about bringing the beauty of nature to your doorstep with our exquisite floral arrangements.</p>
        </FooterSection>

        <FooterSection>
          <h3>Quick Links</h3>
          <FooterLinks>
            <FooterLink to="/products">Shop</FooterLink>
            <FooterLink to="/about">About</FooterLink>
            <FooterLink to="/contact">Contact</FooterLink>
            <FooterLink to="/faq">FAQ</FooterLink>
          </FooterLinks>
        </FooterSection>

        <FooterSection>
          <h3>Contact Us</h3>
          <ContactInfo>
            <p>Email: info@flowershop.com</p>
            <p>Phone: (123) 456-7890</p>
            <p>Address: 123 Flower Street, Garden City</p>
          </ContactInfo>
        </FooterSection>

        <FooterSection>
          <h3>Newsletter</h3>
          <NewsletterForm>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </NewsletterForm>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <p>&copy; 2025 Flower Shop. All rights reserved.</p>
        <SocialLinks>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">Pinterest</a>
        </SocialLinks>
      </FooterBottom>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background: ${props => props.theme.colors.secondary};
  color: white;
  padding: 4rem 0 0;
  margin-top: 4rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    font-family: ${props => props.theme.fonts.primary};
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  p {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  input {
    flex: 1;
    padding: 0.8rem;
    border: none;
    border-radius: 4px;
    font-family: ${props => props.theme.fonts.secondary};
  }

  button {
    padding: 0.8rem 1.5rem;
    background: ${props => props.theme.colors.primary};
    color: white;
    border: none;
    border-radius: 4px;
    font-family: ${props => props.theme.fonts.secondary};
    transition: background 0.3s ease;

    &:hover {
      background: ${props => props.theme.colors.accent};
    }
  }
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 4rem auto 0;
  padding: 2rem 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  p {
    color: rgba(255, 255, 255, 0.8);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 2rem;

  a {
    color: rgba(255, 255, 255, 0.8);
    transition: color 0.3s ease;

    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }
`;

export default Footer;
