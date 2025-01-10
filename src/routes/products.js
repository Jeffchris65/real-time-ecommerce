import express from 'express';
const router = express.Router();

// Mock product database (replace with actual database integration)
let products = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 199.99,
    images: ['https://via.placeholder.com/400?text=Headphones'],
    stock: 10,
    category: 'Electronics'
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    description: 'Advanced smartwatch with health monitoring features',
    price: 299.99,
    images: ['https://via.placeholder.com/400?text=SmartWatch'],
    stock: 15,
    category: 'Electronics'
  },
  {
    id: '3',
    name: 'Designer Leather Bag',
    description: 'Handcrafted premium leather bag',
    price: 149.99,
    images: ['https://via.placeholder.com/400?text=LeatherBag'],
    stock: 8,
    category: 'Fashion'
  },
  {
    id: '4',
    name: 'Ultra HD Smart TV',
    description: '65-inch 4K Smart TV with HDR',
    price: 899.99,
    images: ['https://via.placeholder.com/400?text=SmartTV'],
    stock: 5,
    category: 'Electronics'
  }
];

// Get all products
router.get('/', (req, res) => {
  try {
    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Get single product
router.get('/:id', (req, res) => {
  try {
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'Error fetching product' });
  }
});

// Create product (protected route - add middleware in production)
router.post('/', (req, res) => {
  try {
    const product = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    products.push(product);
    
    // Emit socket event for real-time update
    req.app.get('io').emit('productUpdated', product);
    res.status(201).json(product);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Error creating product' });
  }
});

// Update product
router.put('/:id', (req, res) => {
  try {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    products[index] = {
      ...products[index],
      ...req.body,
      updatedAt: new Date()
    };
    
    // Emit socket event for real-time update
    req.app.get('io').emit('productUpdated', products[index]);
    res.json(products[index]);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Error updating product' });
  }
});

// Delete product
router.delete('/:id', (req, res) => {
  try {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    products = products.filter(p => p.id !== req.params.id);
    
    // Emit socket event for real-time update
    req.app.get('io').emit('productDeleted', req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Error deleting product' });
  }
});

export default router;
