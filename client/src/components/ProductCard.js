import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaStar, FaStarHalf, FaAmazon } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  if (!product) return null;
  
  const { id, title, price, rating = 0, reviews = 0, image, prime } = product;

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalf key="half-star" />);
    }
    return stars;
  };

  return (
    <Card>
      <StyledLink to={`/product/${id}`}>
        <ProductImage src={image || '/images/placeholder.jpg'} alt={title} />
      </StyledLink>
      <Content>
        <ProductTitle to={`/product/${id}`}>{title}</ProductTitle>
        <RatingContainer>
          <Stars>{renderStars()}</Stars>
          <ReviewCount>({reviews.toLocaleString()})</ReviewCount>
        </RatingContainer>
        {prime && (
          <PrimeContainer>
            <FaAmazon />
            <span>prime</span>
          </PrimeContainer>
        )}
        <Price>
          <span>$</span>
          {price.toFixed(2)}
        </Price>
      </Content>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number,
    reviews: PropTypes.number,
    image: PropTypes.string,
    prime: PropTypes.bool
  }).isRequired
};

const Card = styled.div`
  background: white;
  border-radius: 4px;
  padding: 10px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const StyledLink = styled(Link)`
  display: block;
  width: 100%;
  height: 200px;
  margin-bottom: 10px;
  text-decoration: none;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Content = styled.div`
  padding: 0 5px;
`;

const ProductTitle = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-size: 0.9rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 5px;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const Stars = styled.div`
  color: ${({ theme }) => theme.colors.accent};
  display: flex;
  align-items: center;
  font-size: 0.9rem;
`;

const ReviewCount = styled.span`
  color: ${({ theme }) => theme.colors.link};
  font-size: 0.8rem;
  margin-left: 5px;
`;

const PrimeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.8rem;
  margin-bottom: 5px;

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Price = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.error};

  span {
    font-size: 0.8rem;
    vertical-align: top;
    margin-right: 1px;
  }
`;

export default ProductCard;
