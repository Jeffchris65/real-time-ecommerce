import express from 'express';
const router = express.Router();

// Mock orders database (replace with actual database integration)
let orders = [];

// Get all orders for a user
router.get('/', (req, res) => {
  try {
    // In production, filter by authenticated user
    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

// Get single order
router.get('/:id', (req, res) => {
  try {
    const order = orders.find(o => o.id === req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Error fetching order' });
  }
});

// Create order
router.post('/', (req, res) => {
  try {
    const order = {
      id: Date.now().toString(),
      ...req.body,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    orders.push(order);
    
    // Emit socket event for real-time update
    req.app.get('io').emit('orderCreated', order);
    res.status(201).json(order);
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Error creating order' });
  }
});

// Update order status
router.patch('/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    const order = orders.find(o => o.id === req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    order.status = status;
    order.updatedAt = new Date();
    
    // Emit socket event for real-time update
    req.app.get('io').emit('orderUpdated', order);
    res.json(order);
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'Error updating order status' });
  }
});

export default router;
