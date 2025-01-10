import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Home = () => {
  // Banner images for the carousel
  const banners = [
    {
      id: 1,
      image: 'https://picsum.photos/1600/600?random=1',
      title: 'Premium Electronics',
      link: '/category/electronics'
    },
    {
      id: 2,
      image: 'https://picsum.photos/1600/600?random=2',
      title: 'Luxury Fashion',
      link: '/category/fashion'
    },
    {
      id: 3,
      image: 'https://picsum.photos/1600/600?random=3',
      title: 'Elegant Home Decor',
      link: '/category/home'
    }
  ];

  // Featured categories with premium images
  const categories = [
    {
      id: 1,
      title: 'Premium Electronics',
      image: 'https://picsum.photos/800/600?random=4',
      description: 'High-end gadgets and devices',
      link: '/category/electronics'
    },
    {
      id: 2,
      title: 'Luxury Fashion',
      image: 'https://picsum.photos/800/600?random=5',
      description: 'Designer clothing and accessories',
      link: '/category/fashion'
    },
    {
      id: 3,
      title: 'Home & Living',
      image: 'https://picsum.photos/800/600?random=6',
      description: 'Elegant home decor and furniture',
      link: '/category/home'
    },
    {
      id: 4,
      title: 'Premium Beauty',
      image: 'https://picsum.photos/800/600?random=7',
      description: 'Luxury beauty and skincare',
      link: '/category/beauty'
    }
  ];

  // Featured products with high-quality images
  const featuredProducts = [
    {
      id: 1,
      title: 'MacBook Pro 16-inch (2023)',
      price: 2499.99,
      rating: 4.8,
      reviews: 1256,
      image: 'https://picsum.photos/400/400?random=8',
      prime: true,
      category: 'electronics'
    },
    {
      id: 2,
      title: 'Samsung QLED 8K Smart TV',
      price: 3299.99,
      rating: 4.7,
      reviews: 892,
      image: 'https://picsum.photos/400/400?random=9',
      prime: true,
      category: 'electronics'
    },
    {
      id: 3,
      title: 'Designer Leather Handbag',
      price: 1299.99,
      rating: 4.9,
      reviews: 567,
      image: 'https://picsum.photos/400/400?random=10',
      prime: true,
      category: 'fashion'
    },
    {
      id: 4,
      title: 'Premium Coffee Maker',
      price: 799.99,
      rating: 4.6,
      reviews: 1423,
      image: 'https://picsum.photos/400/400?random=11',
      prime: true,
      category: 'home'
    }
  ];

  // Deals of the day
  const deals = [
    {
      id: 1,
      title: 'Sony WH-1000XM4 Wireless Headphones',
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.8,
      reviews: 2341,
      image: 'https://picsum.photos/400/400?random=12',
      prime: true,
      discount: 25
    },
    {
      id: 2,
      title: 'Apple iPad Pro 12.9-inch',
      price: 999.99,
      originalPrice: 1199.99,
      rating: 4.9,
      reviews: 1876,
      image: 'https://picsum.photos/400/400?random=13',
      prime: true,
      discount: 17
    }
  ];

  return (
    <Container>
      {/* Premium Banner Carousel */}
      <CarouselSection>
        <img src={banners[0].image} alt={banners[0].title} />
        <CarouselContent>
          <h1>Welcome to Premium Shopping</h1>
          <p>Discover luxury products and exclusive deals</p>
          <ShopNowButton to="/products">Shop Now</ShopNowButton>
        </CarouselContent>
      </CarouselSection>

      {/* Premium Categories */}
      <Section>
        <SectionTitle>Shop Premium Categories</SectionTitle>
        <CategoryGrid>
          {categories.map(category => (
            <CategoryCard key={category.id}>
              <CategoryImage src={category.image} alt={category.title} />
              <CategoryContent>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <CategoryLink to={category.link}>Shop now</CategoryLink>
              </CategoryContent>
            </CategoryCard>
          ))}
        </CategoryGrid>
      </Section>

      {/* Deals of the Day */}
      <Section>
        <SectionHeader>
          <SectionTitle>Deals of the Day</SectionTitle>
          <ViewAllLink to="/deals">View all deals</ViewAllLink>
        </SectionHeader>
        <ProductGrid>
          {deals.map(product => (
            <DealCard key={product.id}>
              <ProductCard product={product} />
              <DiscountBadge>{product.discount}% OFF</DiscountBadge>
            </DealCard>
          ))}
        </ProductGrid>
      </Section>

      {/* Featured Products */}
      <Section>
        <SectionTitle>Featured Products</SectionTitle>
        <ProductGrid>
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      </Section>

      {/* Prime Banner */}
      <PrimeBanner>
        <PrimeContent>
          <h2>Enjoy Premium Benefits with Prime</h2>
          <p>Fast delivery, exclusive deals, and more</p>
          <PrimeButton to="/prime">Try Prime Free</PrimeButton>
        </PrimeContent>
      </PrimeBanner>
    </Container>
  );
};

const Container = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.wide};
  margin: 0 auto;
  padding: 20px;
  background: ${({ theme }) => theme.colors.lightBackground};
`;

const CarouselSection = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  overflow: hidden;
  margin-bottom: 40px;
  border-radius: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CarouselContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50px;
  transform: translateY(-50%);
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
`;

const ShopNowButton = styled(Link)`
  display: inline-block;
  padding: 15px 30px;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const Section = styled.section`
  background: white;
  padding: 30px;
  border-radius: 8px;
  margin-bottom: 30px;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 20px;
`;

const ViewAllLink = styled(Link)`
  color: ${({ theme }) => theme.colors.link};
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
`;

const CategoryCard = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CategoryContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;

  h3 {
    font-size: 1.4rem;
    margin-bottom: 8px;
  }

  p {
    font-size: 0.9rem;
    margin-bottom: 12px;
    opacity: 0.9;
  }
`;

const CategoryLink = styled(Link)`
  color: ${({ theme }) => theme.colors.accent};
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const DealCard = styled.div`
  position: relative;
`;

const DiscountBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: ${({ theme }) => theme.colors.error};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 0.8rem;
`;

const PrimeBanner = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.secondary} 100%);
  border-radius: 8px;
  padding: 40px;
  margin-bottom: 30px;
  text-align: center;
  color: white;
`;

const PrimeContent = styled.div`
  max-width: 600px;
  margin: 0 auto;

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    opacity: 0.9;
  }
`;

const PrimeButton = styled(Link)`
  display: inline-block;
  padding: 15px 30px;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

export default Home;
